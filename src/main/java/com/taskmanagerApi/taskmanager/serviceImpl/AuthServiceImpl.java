package com.taskmanagerApi.taskmanager.serviceImpl;

import com.taskmanagerApi.taskmanager.dto.LoginRequest;
import com.taskmanagerApi.taskmanager.dto.LoginResponse;
import com.taskmanagerApi.taskmanager.enums.Role;
import com.taskmanagerApi.taskmanager.exception.AccountBlockedException;
import com.taskmanagerApi.taskmanager.exception.UserNotFoundException;
import com.taskmanagerApi.taskmanager.model.User;
import com.taskmanagerApi.taskmanager.repository.UserRepository;
import com.taskmanagerApi.taskmanager.service.AuthService;
import com.taskmanagerApi.taskmanager.service.EmailSenderService;
import com.taskmanagerApi.taskmanager.utility.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailSenderService emailSenderService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;


    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailSenderService emailSenderService, JwtUtil jwtUtil, AuthenticationManager authManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailSenderService = emailSenderService;
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
    }

    @Override
    public LoginResponse loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }
        if (user.getAccountLockedUntil() != null && user.getAccountLockedUntil().isAfter(LocalDateTime.now())) {
            throw new AccountBlockedException("Cannot access account until " + user.getAccountLockedUntil());
        }

        if (user.getPasswordExpiryDate() != null && user.getPasswordExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Password expired. please update your password");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            if (user.getFirstFailedAttemptAt() == null || user.getFirstFailedAttemptAt().plusMinutes(10).isBefore(LocalDateTime.now())) {
                user.setFailedLoginAttempts(1);
                user.setFirstFailedAttemptAt(LocalDateTime.now());
            } else {
                user.setFailedLoginAttempts(user.getFailedLoginAttempts() + 1);
            }
            if (user.getFailedLoginAttempts() >= 4) {
                user.setAccountLockedUntil(LocalDateTime.now().plusDays(2));
                userRepository.save(user);
                emailSenderService.sendAccountBlockedAlert(user.getEmail());
                throw new AccountBlockedException("Account locked until " + user.getAccountLockedUntil());
            }
            userRepository.save(user);
            throw new BadCredentialsException("Invalid email or password");
        }
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }
        user.setFailedLoginAttempts(0);
        user.setAccountLockedUntil(null);
        user.setFirstFailedAttemptAt(null);
        userRepository.save(user);

        String token;
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            token = jwtUtil.generateToken(request.getEmail());
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid Credentials");
        }


        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                token
        );
    }

    @Override
    public User registerUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}
