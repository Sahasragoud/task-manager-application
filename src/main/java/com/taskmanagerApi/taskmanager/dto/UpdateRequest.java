package com.taskmanagerApi.taskmanager.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateRequest {

    private String name;
    private String email;
    private LocalDate dateOfBirth;
    private String gender;
    private String profession;
    private String phoneNumber;
    private String address;

}
