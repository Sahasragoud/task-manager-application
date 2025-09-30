package com.taskmanagerApi.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportRequest {
    private String title;
    private String description;
    private String phone;
}
