package com.example.todolistbackend.controller;

import com.example.todolistbackend.dto.TaskDto;
import com.example.todolistbackend.dto.TaskDtoResponse;
import com.example.todolistbackend.dto.UserDto;
import com.example.todolistbackend.dto.UserDtoResponse;
import com.example.todolistbackend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/tasks")
public class TaskController {

    @Autowired
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping(path = "/{username}")
    public List<TaskDtoResponse> getAllTasks(@PathVariable("username") String username) {
        return taskService.getAllTasks(username);
    }

    @GetMapping(path = "/{id}")
    public TaskDtoResponse getTask(@PathVariable("id") Long id) {
        return taskService.getTask(id);
    }

    @PostMapping(path = "/add/{username}")
    public TaskDtoResponse registerTask(@Valid @RequestBody TaskDto taskDto,
                                        @PathVariable("username") String username) {
        return taskService.addTask(taskDto, username);
    }
    @PutMapping(path = "/{id}")
    public TaskDtoResponse updateTask(@PathVariable("id") Long id,
                                      @Valid @RequestBody TaskDto taskDto) {
        return taskService.updateTask(id, taskDto);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
