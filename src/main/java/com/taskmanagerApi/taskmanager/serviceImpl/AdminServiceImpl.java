package com.taskmanagerApi.taskmanager.serviceImpl;

import com.taskmanagerApi.taskmanager.dto.TaskResponse;
import com.taskmanagerApi.taskmanager.dto.UserRequest;
import com.taskmanagerApi.taskmanager.dto.UserResponse;
import com.taskmanagerApi.taskmanager.enums.Role;
import com.taskmanagerApi.taskmanager.jobs.ScheduledEmailJob;
import com.taskmanagerApi.taskmanager.model.User;
import com.taskmanagerApi.taskmanager.repository.TaskRepository;
import com.taskmanagerApi.taskmanager.repository.UserRepository;
import com.taskmanagerApi.taskmanager.service.AdminService;
import com.taskmanagerApi.taskmanager.service.EmailSenderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ScheduledEmailJob scheduledEmailJob;
    private final EmailSenderService emailSenderService;
    private final TaskRepository taskRepository;

    public AdminServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, ScheduledEmailJob scheduledEmailJob, EmailSenderService emailSenderService, TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.scheduledEmailJob = scheduledEmailJob;
        this.emailSenderService = emailSenderService;
        this.taskRepository = taskRepository;
    }

    @Override
    public User createUser(UserRequest request)
    {   User user = new User();
        user.setFailedLoginAttempts(0);
        user.setPasswordExpiryDate(LocalDateTime.now().plusDays(30));
        user.setName(request.getName());
        user.setProfession(request.getProfession());
        user.setAddress(request.getAddress());
        user.setGender(request.getGender());
        user.setEmail(request.getEmail());
        if("user".equalsIgnoreCase(request.getRole())){
            user.setRole(Role.USER);
        }else {
            user.setRole(Role.ADMIN);
        }
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDateOfBirth(LocalDate.parse(request.getDateOfBirth()));
        user.setPhoneNumber(request.getPhone());
        return userRepository.save(user);
    }

    @Override
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getDateOfBirth(),
                        user.getGender(),
                        user.getRole(),
                        user.getProfession(),
                        user.getAddress(),
                        user.getFailedLoginAttempts(),
                        user.getAccountLockedUntil(),
                        user.getFirstFailedAttemptAt(),
                        user.getPasswordExpiryDate(),
                        user.getLastPasswordWarningSentAt()
                ));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Page<TaskResponse> getAllTasks(Pageable pageable) {
        return taskRepository.findAll(pageable)
                .map(task -> new TaskResponse(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getStatus(),
                        task.getDueDate(),
                        task.getUser() != null ? task.getUser().getId() : null,
                        task.getUser() != null ? task.getUser().getName() : null
                ));
    }

}
