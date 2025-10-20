package com.taskmanagerApi.taskmanager.serviceImpl;

import com.taskmanagerApi.taskmanager.service.EmailSenderService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;


@Service
public class EmailSenderServiceImpl implements EmailSenderService {

    private final JavaMailSender mailSender;

    public EmailSenderServiceImpl(JavaMailSender mailSender){
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

    @Override
    public void sendPasswordResetEmail(String toEmail, String subject, String body) {
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body);
            mailSender.send(msg);
            System.out.println("Reset email sent to: " + toEmail);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}
