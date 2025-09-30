package com.taskmanagerApi.taskmanager.repository;

import com.taskmanagerApi.taskmanager.model.Report;
import com.taskmanagerApi.taskmanager.model.ReportStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report,Long> {
    Page<Report> findByUserId(Long userId, Pageable pageable);
    long countByStatus(ReportStatus reportStatus);
    Page<Report> findAll(Pageable pageable);
 }
