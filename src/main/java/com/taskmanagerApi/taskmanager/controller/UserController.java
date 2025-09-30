package com.taskmanagerApi.taskmanager.controller;

import com.taskmanagerApi.taskmanager.dto.*;
import com.taskmanagerApi.taskmanager.model.User;
import com.taskmanagerApi.taskmanager.service.EmailSenderService;
import com.taskmanagerApi.taskmanager.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:5173")

public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final EmailSenderService emailSenderService;

    public UserController(UserService userService, PasswordEncoder passwordEncoder, EmailSenderService emailSenderService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.emailSenderService = emailSenderService;
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
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody String newPassword){
        return userService.resetPassword(token,newPassword);
    }

}
