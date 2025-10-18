package com.taskmanagerApi.taskmanager.service;

import com.taskmanagerApi.taskmanager.dto.TaskRequest;
import com.taskmanagerApi.taskmanager.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface TaskService {
    Task getById(Long id);
    Page<Task> findByUserId(Long userId,Pageable pageable);
    Task createTask(Long id, TaskRequest taskRequest);
    Task updateTask(Long id, Task updatedTask);
    void deleteTask(Long id);
}
