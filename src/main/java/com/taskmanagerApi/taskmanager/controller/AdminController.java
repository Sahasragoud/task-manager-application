package com.taskmanagerApi.taskmanager.controller;

import com.taskmanagerApi.taskmanager.dto.TaskResponse;
import com.taskmanagerApi.taskmanager.dto.UserRequest;
import com.taskmanagerApi.taskmanager.dto.UserResponse;
import com.taskmanagerApi.taskmanager.model.User;
import com.taskmanagerApi.taskmanager.service.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://192.168.117.6:5173")
public class AdminController {
    private final AdminService adminService;

    public AdminController( AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("user/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createUser(@RequestBody UserRequest request){
        User savedUser = adminService.createUser(request);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UserResponse> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection
    ){
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Sort sortBy = Sort.by(direction, sortField);
        return adminService.getAllUsers(PageRequest.of(page,size,sortBy));
    }

    @DeleteMapping("user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id){
        adminService.deleteUser(id);
    }

    @GetMapping("/tasks")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<TaskResponse> getAllTasks(
            @RequestParam(name = "taskPage", defaultValue = "0") int page,
            @RequestParam(name = "taskSize", defaultValue = "10") int size,
            @RequestParam(name = "sortTaskField", defaultValue = "id") String sortField,
            @RequestParam(name = "sortTaskDirection", defaultValue = "asc") String sortDirection) {
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Sort sortBy = Sort.by(direction, sortField);
        return adminService.getAllTasks(PageRequest.of(page, size, sortBy));
    }


}
