package com.taskmanagerApi.taskmanager.controller;
import com.taskmanagerApi.taskmanager.dto.TaskRequest;
import com.taskmanagerApi.taskmanager.model.Task;
import com.taskmanagerApi.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController 
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://192.168.117.6:5173")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getById(id);
    }

    @PutMapping("/{id}") public Task updateTaskById(@PathVariable Long id, @RequestBody Task updatedTask) {
        return taskService.updateTask(id, updatedTask);
    }

    @PostMapping("/user/{id}") public Task createTask(@PathVariable Long id, @RequestBody TaskRequest taskRequest) {
        return taskService.createTask(id, taskRequest);
    }

    @DeleteMapping("/{id}") public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @GetMapping("/user/{userId}/tasks")
    public Page<Task> getTaskByUserId(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection ) {
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));
        return taskService.findByUserId(userId, pageable);
    }
}