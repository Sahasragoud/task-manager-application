package com.taskmanagerApi.taskmanager.serviceImpl;

import com.taskmanagerApi.taskmanager.model.User;
import com.taskmanagerApi.taskmanager.repository.UserRepository;
import com.taskmanagerApi.taskmanager.service.EmailSenderService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.LocalDateTime;
import java.util.UUID;


@Service
public class EmailSenderServiceImpl implements EmailSenderService {

    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    public EmailSenderServiceImpl(UserRepository userRepository, JavaMailSender mailSender){
        this.userRepository  = userRepository;
        this.mailSender = mailSender;
    }
    @Override
    public void sendPasswordExpiryWarning(String toEmail, String subject, String body) {
        try{
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg,true);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body);
            System.out.println("Sending email to: " + toEmail);
            mailSender.send(msg);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendAccountBlockedAlert(String toEmail) {
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true);

            helper.setTo(toEmail);
            helper.setSubject("Account blocked !! alert !!");
            helper.setText("Hello, \n\nDue to numerous failed attempts of signing in to this account.We have to block your account for 2 days.For emergency concerns please contact our team. \n\n Regards,\n\nTaskManager Team");
            mailSender.send(msg);
            System.out.println("Sent email to:  " + toEmail);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

   /* @Override
    public void sendSignInAlert(String toEmail) {

        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true);

            helper.setTo(toEmail);
            helper.setSubject("Signing in !!");
            helper.setText("Hello, \n\nSomeone is trying to sign in to this account from other device.Not you, please contact our team. \n\n Regards,\n\nTaskManager Team");

            mailSender.send(msg);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }*/
    @Override
    public void sendForgotPasswordRequest(User user) {
        try{
            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));
            userRepository.save(user);


            String resetLink = "http://localhost:8080:/api/users/reset-password?token" + token;

            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg,true);

            helper.setTo(user.getEmail());
            helper.setSubject("Forgot Password");
            helper.setText("Hello, " + user.getName()
                    + "\n\nClick the following link to reset your password:\n"
                    + resetLink
                    + "\n\nNote: This link will expire in 15 minutes."
                    + "\n\nRegards,\nTaskManager Team");

            mailSender.send(msg);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
