package com.taskmanagerApi.taskmanager.jobs;

import com.taskmanagerApi.taskmanager.model.User;
import com.taskmanagerApi.taskmanager.repository.UserRepository;
import com.taskmanagerApi.taskmanager.service.EmailSenderService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class ScheduledEmailJob {
    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;

    public ScheduledEmailJob(UserRepository userRepository, EmailSenderService emailSenderService) {
        this.userRepository = userRepository;
        this.emailSenderService = emailSenderService;
    }


    @Scheduled(cron = "0 0 9 * * ?")
    public void sendPasswordExpiryWarnings(){
        System.out.println(" Running scheduled email check...");
        List<User> users = userRepository.findAll();
        for(User user : users){
            String subject = "Password Expiry Warning";
            String body = "Dear " + user.getName() + ",\n\nYor password will expire on " +
                    user.getPasswordExpiryDate() + ". Please update it to avoid account lock. \n\nThanks. \n\nTaskManager Team";

            emailSenderService.sendPasswordExpiryWarning(user.getEmail(),subject,body);
        }
    }

    @Scheduled(cron = "0 0 9 * * ?")
    public void sendAccountBlockedNotice(){
        System.out.println(" Running scheduled email check sending blocked accounts ...");
        List<User> blockedUsers = userRepository.findAll().stream()
                .filter(user -> user.getAccountLockedUntil().isAfter(LocalDateTime.now()))
                .toList();
        for(User user : blockedUsers) {
            emailSenderService.sendAccountBlockedAlert(user.getEmail());
        }
    }

    public void sendPasswordResetEmail(String toEmail, String token) {
        User user = userRepository.findByEmail(toEmail);
        String resetLink = "http://192.168.117.6:5173/reset-password?token=" + token;
            String subject = "Password Reset Request";
            String body = "Hello, " + user.getName() + ",\n\nClick the link to reset your password:\n" 
                        + resetLink + "\n\nNote: This link will expire in 15 minutes.\n\nTaskManager Team";

            emailSenderService.sendPasswordResetEmail(user.getEmail(), subject, body);
        }    
    }
    
