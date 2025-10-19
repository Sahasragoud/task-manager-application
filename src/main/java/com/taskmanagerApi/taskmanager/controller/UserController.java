package com.taskmanagerApi.taskmanager.controller;

import com.taskmanagerApi.taskmanager.dto.*;
import com.taskmanagerApi.taskmanager.jobs.ScheduledEmailJob;
import com.taskmanagerApi.taskmanager.model.User;
import com.taskmanagerApi.taskmanager.service.EmailSenderService;
import com.taskmanagerApi.taskmanager.service.UserService;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://192.168.117.6:5173")
public class UserController {
    private final UserService userService;
    private final ScheduledEmailJob emailJob;

    public UserController(UserService userService, ScheduledEmailJob emailJob) {
        this.userService = userService;
        this.emailJob = emailJob;
    }

    @GetMapping("/by-id")
    public User getUserById(@RequestParam Long id){
        User user = userService.getUserById(id);
        return user;
    }


    @GetMapping("/by-email")
    public User getUserByEmail(@RequestParam String email){
        return userService.getUserByEmail(email);
    }

    @PutMapping("/{id}/profile")
    public User updateUser(@PathVariable Long id, @RequestBody UpdateRequest request){
        return userService.updateUser(id,request);
    }

    @PutMapping("/{userId}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long userId,
                                            @RequestBody UserPasswordRequest passwordUpdateRequest) {
        userService.updatePassword(userId, passwordUpdateRequest);
        System.out.println("Inside updatePassword endpoint");
        return ResponseEntity.ok("Password updated successfully");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        return userService.resetPassword(token, newPassword);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userService.getUserByEmail(email);
        if (user != null) {
                userService.sendPasswordResetToken(user); // Service generates token + sends email
        }
        return ResponseEntity.ok("If this email exists, a reset link has been sent.");
    }
}
