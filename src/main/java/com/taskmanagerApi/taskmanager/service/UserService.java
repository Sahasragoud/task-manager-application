package com.taskmanagerApi.taskmanager.service;

import com.taskmanagerApi.taskmanager.dto.*;
import com.taskmanagerApi.taskmanager.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

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
