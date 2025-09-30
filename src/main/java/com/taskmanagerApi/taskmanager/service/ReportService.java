package com.taskmanagerApi.taskmanager.service;

import com.taskmanagerApi.taskmanager.dto.ReportRequest;
import com.taskmanagerApi.taskmanager.dto.ReportResponse;
import com.taskmanagerApi.taskmanager.model.Report;
import com.taskmanagerApi.taskmanager.model.ReportStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface ReportService {
    Report createReport(String userEmail, ReportRequest request);

    Page<ReportResponse> getReports(Pageable pageable);

    Page<Report> getReportsByUser(Long userId, Pageable pageable);

    Report updateStatus(Long id, ReportStatus status);
}
