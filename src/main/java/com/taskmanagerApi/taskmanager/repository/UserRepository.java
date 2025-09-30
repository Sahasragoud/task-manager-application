package com.taskmanagerApi.taskmanager.repository;

import com.taskmanagerApi.taskmanager.dto.UserResponse;
import com.taskmanagerApi.taskmanager.model.Report;
import com.taskmanagerApi.taskmanager.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);
    List<User> findByPasswordExpiryDateBetween(LocalDateTime start, LocalDateTime end);
    User findByResetToken(String resetToken);
    long countByAccountLockedUntilIsBeforeOrAccountLockedUntilIsNull(LocalDateTime now);
    long countByAccountLockedUntilIsAfter(LocalDateTime now);
}
