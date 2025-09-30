package com.taskmanagerApi.taskmanager.repository;

import com.taskmanagerApi.taskmanager.dto.TaskResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.taskmanagerApi.taskmanager.model.Task;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Page<Task> findAll(Pageable pageable);
    Page<Task> findByUserId(Long userId,Pageable pageable);
    long countByStatus(String status);
}
