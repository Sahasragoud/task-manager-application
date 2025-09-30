package com.taskmanagerApi.taskmanager.service;

import com.taskmanagerApi.taskmanager.dto.LoginRequest;
import com.taskmanagerApi.taskmanager.dto.LoginResponse;
import com.taskmanagerApi.taskmanager.model.User;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    User registerUser(User user);
    LoginResponse loginUser(LoginRequest request);

}
