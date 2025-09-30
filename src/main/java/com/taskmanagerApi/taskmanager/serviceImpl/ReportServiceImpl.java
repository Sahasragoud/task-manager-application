package com.taskmanagerApi.taskmanager.serviceImpl;

import com.taskmanagerApi.taskmanager.dto.ReportRequest;
import com.taskmanagerApi.taskmanager.dto.ReportResponse;
import com.taskmanagerApi.taskmanager.exception.UserNotFoundException;
import com.taskmanagerApi.taskmanager.model.Report;
import com.taskmanagerApi.taskmanager.model.ReportStatus;
import com.taskmanagerApi.taskmanager.model.User;
import com.taskmanagerApi.taskmanager.repository.ReportRepository;
import com.taskmanagerApi.taskmanager.repository.UserRepository;
import com.taskmanagerApi.taskmanager.service.ReportService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    public ReportServiceImpl(ReportRepository reportRepository, UserRepository userRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Report createReport(String userEmail, ReportRequest request) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new UserNotFoundException("User not found with email : " + userEmail);
        }

        Report report = new Report();
        report.setUser(user);
        report.setCreatedAt(LocalDateTime.now());
        report.setTitle(request.getTitle());
        report.setDescription(request.getDescription());

        // If you want the phone from the request instead of user
        report.setPhoneNumber(request.getPhone());
        report.setStatus(ReportStatus.OPEN);
        return reportRepository.save(report);
    }

    @Override
    public Page<ReportResponse> getReports(Pageable pageable) {
        return reportRepository.findAll(pageable)
                .map(report -> new ReportResponse(
                        report.getId(),
                        report.getTitle(),
                        report.getDescription(),
                        report.getPhoneNumber(),
                        report.getStatus(),
                        report.getCreatedAt(),
                        report.getUpdatedAt(),
                        report.getUser() != null ? report.getUser().getEmail() : null
                ));
    }

    @Override
    public Page<Report> getReportsByUser(Long userId, Pageable pageable) {
        return reportRepository.findByUserId(userId, pageable);
    }

    @Override
    public Report updateStatus(Long id, ReportStatus status) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        report.setStatus(status);
        report.setUpdatedAt(LocalDateTime.now());
        return reportRepository.save(report);
    }

}
