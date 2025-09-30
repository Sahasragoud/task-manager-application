package com.taskmanagerApi.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private String dateOfBirth;
    private String gender;
    private String profession;
    private String address;
    private String role;
}
