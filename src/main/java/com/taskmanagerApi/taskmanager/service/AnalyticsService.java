package com.taskmanagerApi.taskmanager.service;

import com.taskmanagerApi.taskmanager.dto.AnalyticsResponse;
import org.springframework.stereotype.Service;

@Service
public interface AnalyticsService {
    AnalyticsResponse getAnalytics();
}
