package com.taskmanagerApi.taskmanager.service;

import com.taskmanagerApi.taskmanager.dto.*;
import com.taskmanagerApi.taskmanager.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    User getUserById(Long id);
    User getUserByEmail(String email);
    User updateUser(Long id, UpdateRequest request);
    void updatePassword(Long userId, UserPasswordRequest passwordUpdateRequest);
    void passwordExpiryAlert();
    User findByResetToken(String token);
    void blockedAccountNotice();
    ResponseEntity<String> resetPassword(String token , String newPassword);
}
