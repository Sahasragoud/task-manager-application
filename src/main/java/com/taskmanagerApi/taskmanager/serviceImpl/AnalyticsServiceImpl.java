package com.taskmanagerApi.taskmanager.serviceImpl;

import com.taskmanagerApi.taskmanager.dto.AnalyticsResponse;
import com.taskmanagerApi.taskmanager.model.ReportStatus;
import com.taskmanagerApi.taskmanager.repository.ReportRepository;
import com.taskmanagerApi.taskmanager.repository.TaskRepository;
import com.taskmanagerApi.taskmanager.repository.UserRepository;
import com.taskmanagerApi.taskmanager.service.AnalyticsService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public AnalyticsServiceImpl(ReportRepository reportRepository, UserRepository userRepository, TaskRepository taskRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public AnalyticsResponse getAnalytics() {
        long users = userRepository.count();
        long tasks = taskRepository.count();
        long reports = reportRepository.count();
        long completedTasks = taskRepository.countByStatus("Completed");
        long inProgressTasks = taskRepository.countByStatus("In Progress");
        long pendingTasks = taskRepository.countByStatus("Pending");
        long openReports = reportRepository.countByStatus(ReportStatus.OPEN);
        long resolvedReports = reportRepository.countByStatus(ReportStatus.RESOLVED);
        long activeUsers = userRepository.countByAccountLockedUntilIsBeforeOrAccountLockedUntilIsNull(LocalDateTime.now());
        long blockedUsers = userRepository.countByAccountLockedUntilIsAfter(LocalDateTime.now());
        long inReviewReports = reportRepository.countByStatus(ReportStatus.IN_REVIEW);
        return new AnalyticsResponse(users,tasks,reports,completedTasks,inProgressTasks,pendingTasks,activeUsers,blockedUsers,openReports,resolvedReports, inReviewReports);
    }
}
