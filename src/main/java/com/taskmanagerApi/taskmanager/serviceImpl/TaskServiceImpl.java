package com.taskmanagerApi.taskmanager.serviceImpl;

import com.taskmanagerApi.taskmanager.dto.TaskRequest;
import com.taskmanagerApi.taskmanager.exception.UserNotFoundException;
import com.taskmanagerApi.taskmanager.model.Task;
import com.taskmanagerApi.taskmanager.model.User;
import com.taskmanagerApi.taskmanager.repository.TaskRepository;
import com.taskmanagerApi.taskmanager.repository.UserRepository;
import com.taskmanagerApi.taskmanager.service.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskServiceImpl(TaskRepository taskRepository,UserRepository userRepository){
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Task getById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found with ID:" + id));
    }

    @Override
    public Page<Task> findByUserId(Long userId,Pageable pageable) {
        if(!userRepository.existsById(userId)){
            throw new UserNotFoundException("User not found with id - " + userId);
        }
        return taskRepository.findByUserId(userId,pageable);
    }

    @Override
    public Task createTask(Long id, TaskRequest taskRequest) {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            Task task = new Task();
            task.setUser(user);
            task.setDescription(taskRequest.getDescription());
            task.setStatus(taskRequest.getStatus());
            task.setTitle(taskRequest.getTitle());
            task.setDueDate(LocalDate.parse(taskRequest.getDueDate()));
            return taskRepository.save(task);
        }else{
            throw new UserNotFoundException("User not found with id" + id);
        }
    }

    @Override
    public Task updateTask(Long id, Task updatedTask) {
        Task existing = getById(id);

        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setStatus(updatedTask.getStatus());
        existing.setDueDate(updatedTask.getDueDate());

        return taskRepository.save(existing); // Save the updated task
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
