package com.taskmanagerApi.taskmanager.controller;

import com.taskmanagerApi.taskmanager.dto.ReportRequest;
import com.taskmanagerApi.taskmanager.dto.ReportResponse;
import com.taskmanagerApi.taskmanager.model.Report;
import com.taskmanagerApi.taskmanager.model.ReportStatus;
import com.taskmanagerApi.taskmanager.service.ReportService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/reports")
@CrossOrigin("http://localhost:5173")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/user/{email}")
    public ResponseEntity<Report> createReport(
            @PathVariable String email,
            @RequestBody ReportRequest request) {
        return ResponseEntity.ok(reportService.createReport(email, request));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN)")
    public ResponseEntity<Page<ReportResponse>> getReports(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ){
        return ResponseEntity.ok(reportService.getReports(PageRequest.of(page,size)));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN)")
    public ResponseEntity<Page<Report>> getReportsByUser(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(reportService.getReportsByUser(userId, PageRequest.of(page,size)));
    }

    @PutMapping("/{reportId}/status")
    @PreAuthorize("hasRole('ADMIN)")
    public ResponseEntity<Report> updateStatus(
            @PathVariable Long reportId,
            @RequestParam ReportStatus status) {
        return ResponseEntity.ok(reportService.updateStatus(reportId, status));
    }
}
