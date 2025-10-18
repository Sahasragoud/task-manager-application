package com.taskmanagerApi.taskmanager.service;

import com.taskmanagerApi.taskmanager.dto.LoginRequest;
import com.taskmanagerApi.taskmanager.dto.LoginResponse;
import com.taskmanagerApi.taskmanager.dto.UserRequest;
import com.taskmanagerApi.taskmanager.dto.UserResponse;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    UserResponse registerUser(UserRequest userRequest);
    LoginResponse loginUser(LoginRequest request);

}
