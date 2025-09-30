package com.taskmanagerApi.taskmanager.service;

import com.taskmanagerApi.taskmanager.dto.TaskResponse;
import com.taskmanagerApi.taskmanager.dto.UserRequest;
import com.taskmanagerApi.taskmanager.dto.UserResponse;
import com.taskmanagerApi.taskmanager.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface AdminService {
    User createUser(UserRequest request);
    Page<UserResponse> getAllUsers(Pageable pageable);
    void deleteUser(Long id);
    Page<TaskResponse> getAllTasks(Pageable pageable);

}
