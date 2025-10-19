package com.taskmanagerApi.taskmanager.controller;

import com.taskmanagerApi.taskmanager.dto.AnalyticsResponse;
import com.taskmanagerApi.taskmanager.service.AnalyticsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://192.168.117.6:5173")
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/analytics")
    @PreAuthorize("hasRole('ADMIN')")
    public AnalyticsResponse getAnalytics(){
        return analyticsService.getAnalytics();
    }
}
