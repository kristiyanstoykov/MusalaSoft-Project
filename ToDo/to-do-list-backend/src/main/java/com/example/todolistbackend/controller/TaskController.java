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

@RestController
@RequestMapping(path = "/to_do_list_system/tasks")
public class TaskController {

    @Autowired
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping(path = "/{id}/get-task")
    public TaskDtoResponse getTask(@PathVariable("id") Long id) {
        return taskService.getTask(id);
    }

    @PostMapping(path = "/add-task")
    public TaskDtoResponse registerTask(@Valid @RequestBody TaskDto taskDto) {
        return taskService.addTask(taskDto);
    }
    @PutMapping(path = "/{id}/update-task")
    public TaskDtoResponse updateTask(@PathVariable("id") Long id,
                                      @Valid @RequestBody TaskDto taskDto) {
        return taskService.updateTask(id, taskDto);
    }

    @DeleteMapping(path = "/{id}/delete-task")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
