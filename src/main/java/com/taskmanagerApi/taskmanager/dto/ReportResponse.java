package com.taskmanagerApi.taskmanager.dto;

import com.taskmanagerApi.taskmanager.model.ReportStatus;
import com.taskmanagerApi.taskmanager.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponse {
    private Long id;
    private String title;
    private String description;
    private String phoneNumber;
    private ReportStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String userEmail;

}
