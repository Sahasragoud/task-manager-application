package com.taskmanagerApi.taskmanager.controller;

import com.taskmanagerApi.taskmanager.dto.*;
import com.taskmanagerApi.taskmanager.model.User;
import com.taskmanagerApi.taskmanager.service.UserService;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://192.168.117.6:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 🔹 Get user by ID
    @GetMapping("/by-id")
    public User getUserById(@RequestParam Long id) {
        return userService.getUserById(id);
    }

    // 🔹 Get user by Email
    @GetMapping("/by-email")
    public User getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

    // 🔹 Update Profile
    @PutMapping("/{id}/profile")
    public User updateUser(@PathVariable Long id, @RequestBody UpdateRequest request) {
        return userService.updateUser(id, request);
    }

    // 🔹 Update Password (from Dashboard)
    @PutMapping("/{userId}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long userId,
                                            @RequestBody UserPasswordRequest passwordUpdateRequest) {
        userService.updatePassword(userId, passwordUpdateRequest);
        System.out.println("Inside updatePassword endpoint");
        return ResponseEntity.ok("Password updated successfully");
    }

    // 🔹 Forgot Password (generate token + send email)
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userService.getUserByEmail(email);
        if (user != null) {
            userService.sendPasswordResetToken(user); // generates token + sends email
        }
        return ResponseEntity.ok("If this email exists, a reset link has been sent.");
    }

    // 🔹 Verify Reset Token (used by frontend when link opens)
    @GetMapping("/verify-reset-token")
    public ResponseEntity<?> verifyResetToken(@RequestParam String token) {
        try {
            User user = userService.verifyResetToken(token);
            if (user == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired token"));
            }

            // Send username & email to frontend to display
            return ResponseEntity.ok(Map.of(
                    "username", user.getName(),
                    "email", user.getEmail()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // 🔹 Reset Password (from reset page with token)
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        return userService.resetPassword(token, newPassword);
    }
}
