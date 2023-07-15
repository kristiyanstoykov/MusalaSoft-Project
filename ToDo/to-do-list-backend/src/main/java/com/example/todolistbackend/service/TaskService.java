package com.example.todolistbackend.service;

import com.example.todolistbackend.dto.TaskDto;
import com.example.todolistbackend.dto.TaskDtoResponse;
import com.example.todolistbackend.model.Task;
import com.example.todolistbackend.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ModelMapper modelMapper;

    private TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
        this.modelMapper = new ModelMapper();
    }

    public TaskDtoResponse getTask( Long id ) {

        Task task = taskRepository.findById( id )
            .orElseThrow( () -> new IllegalStateException("Task not found") );


            return modelMapper.map(task, TaskDtoResponse.class);
    }

    public TaskDtoResponse registerTask(TaskDto taskDto) {

        Task taskToRegister = modelMapper.map(taskDto, Task.class);
        taskRepository.save(taskToRegister);

        return modelMapper.map(taskToRegister, TaskDtoResponse.class);

    }


}
