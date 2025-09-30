package com.taskmanagerApi.taskmanager.service;

import com.taskmanagerApi.taskmanager.model.User;
import org.springframework.http.ResponseEntity;

public interface EmailSenderService {

    void sendPasswordExpiryWarning(String toEmail, String sub, String body);

    void sendAccountBlockedAlert(String toEmail);

    void sendForgotPasswordRequest(User user);

}
