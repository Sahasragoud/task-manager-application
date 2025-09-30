package com.taskmanagerApi.taskmanager.dto;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserPasswordRequest {

    @NotBlank(message="Old password is required")
    private String oldPassword;

    @Size(min=8,message = "Password must be at least 8characters")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
            message = "Password must include 1 uppercase, 1 digit, and 1 special character"
    )
    private String newPassword;
}
