package com.taskmanagerApi.taskmanager.service;

import com.taskmanagerApi.taskmanager.model.User;

public interface EmailSenderService {

    void sendPasswordExpiryWarning(String toEmail, String sub, String body);
    void sendAccountBlockedAlert(String toEmail);
    void sendForgotPasswordRequest(User user);
    void sendPasswordResetEmail(String toEmail, String subject, String body);

}
