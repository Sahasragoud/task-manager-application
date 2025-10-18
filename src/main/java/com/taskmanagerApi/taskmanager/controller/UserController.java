package com.taskmanagerApi.taskmanager.controller;

import com.taskmanagerApi.taskmanager.dto.*;
import com.taskmanagerApi.taskmanager.model.User;
import com.taskmanagerApi.taskmanager.service.UserService;
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
