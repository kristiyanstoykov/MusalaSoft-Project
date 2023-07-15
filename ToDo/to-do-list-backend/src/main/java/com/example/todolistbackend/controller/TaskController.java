package com.example.todolistbackend.controller;

import com.example.todolistbackend.dto.TaskDto;
import com.example.todolistbackend.dto.TaskDtoResponse;
import com.example.todolistbackend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping(path = "/register-user")
    public TaskDtoResponse registerTask(@Valid @RequestBody TaskDto taskDto) {
        return taskService.registerTask(taskDto);
    }

}
