package com.taskmanagerApi.taskmanager.serviceImpl;

import com.taskmanagerApi.taskmanager.dto.*;
import com.taskmanagerApi.taskmanager.enums.Role;
import com.taskmanagerApi.taskmanager.exception.AccountBlockedException;
import com.taskmanagerApi.taskmanager.exception.UserNotFoundException;
import com.taskmanagerApi.taskmanager.jobs.ScheduledEmailJob;
import com.taskmanagerApi.taskmanager.model.User;
import com.taskmanagerApi.taskmanager.repository.UserRepository;
import com.taskmanagerApi.taskmanager.service.EmailSenderService;
import com.taskmanagerApi.taskmanager.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ScheduledEmailJob scheduledEmailJob;
    private final EmailSenderService emailSenderService;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, ScheduledEmailJob scheduledEmailJob, EmailSenderService emailSenderService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.scheduledEmailJob = scheduledEmailJob;
        this.emailSenderService = emailSenderService;
    }


    @Override
    public User getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return user;
    }


    @Override
    public User getUserByEmail(String email) throws UserNotFoundException {
        return Optional.ofNullable(userRepository.findByEmail(email))
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    }

    @Override()
    public User updateUser(Long id, UpdateRequest request) {
        User old = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id :" + id));
        if(request.getEmail() != null) old.setEmail(request.getEmail());
        if(request.getName() != null) old.setName(request.getName());
        if(request.getGender() != null) old.setGender(request.getGender());
        if(request.getDateOfBirth() != null) old.setDateOfBirth(request.getDateOfBirth());
        if(request.getProfession() != null) old.setProfession(request.getProfession());
        if(request.getPhoneNumber() != null) old.setPhoneNumber(request.getPhoneNumber());
        if(request.getAddress() != null) old.setAddress(request.getAddress());
        return userRepository.save(old);
    }

    @Override
    public void updatePassword(Long userId, UserPasswordRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new BadCredentialsException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setPasswordExpiryDate(LocalDateTime.now().plusDays(30));
        userRepository.save(user);
    }

    @Override
    public void passwordExpiryAlert() {
        List<User> users = userRepository.findAll();
        for(User user : users){
            long daysLeft = ChronoUnit.DAYS.between(LocalDateTime.now(), user.getPasswordExpiryDate());
                if(daysLeft <= 3 && daysLeft > 0){
                    scheduledEmailJob.sendPasswordExpiryWarnings();
                }
        }
    }

    @Override
    public User findByResetToken(String token) {
        return userRepository.findByResetToken(token);
    }

    @Override
    public void blockedAccountNotice() {
        scheduledEmailJob.sendAccountBlockedNotice();
    }

    @Override
    public ResponseEntity<String> resetPassword(String token , String newPassword){
        User user = userRepository.findByResetToken(token);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return ResponseEntity.ok("Password reset successful");
    }
}
