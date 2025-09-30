package com.taskmanagerApi.taskmanager.dto;

import com.taskmanagerApi.taskmanager.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String gender;
    private Role role;
    private String profession;
    private String address;
    private Integer failedLoginAttempts;
    private LocalDateTime accountLockedUntil;
    private LocalDateTime firstFailedAttemptAt;
    private LocalDateTime passwordExpiryDate;
    private LocalDate lastPasswordWarningSentAt;
}
