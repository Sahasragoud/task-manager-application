package com.taskmanagerApi.taskmanager.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class AnalyticsResponse {
    private long totalUsers;
    private long totalTasks;
    private long totalReports;
    private long completedTasks;
    private long inProgressTasks;
    private long pendingTasks;
    private long activeUsers;
    private long blockedUsers;
    private long openReports;
    private long resolvedReports;
    private long inReviewReports;
}
