package com.example.todolistbackend.service;

import com.example.todolistbackend.dto.TaskDto;
import com.example.todolistbackend.dto.TaskDtoResponse;
import com.example.todolistbackend.exception.TaskDoesNotExistException;
import com.example.todolistbackend.exception.UserDoesNotExistException;
import com.example.todolistbackend.model.Task;
import com.example.todolistbackend.model.User;
import com.example.todolistbackend.repository.TaskRepository;
import com.example.todolistbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.todolistbackend.common.ExceptionMessages.TASK_DOES_NOT_EXIST;
import static com.example.todolistbackend.common.ExceptionMessages.USER_DOES_NOT_EXIST;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Autowired
    private TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.modelMapper = new ModelMapper();
        this.userRepository = userRepository;
    }

    public List<TaskDtoResponse> getAllTasks(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserDoesNotExistException(USER_DOES_NOT_EXIST));

        List<Task> tasks = taskRepository.findAllByUser(user);

        return tasks
                .stream()
                .map(task -> modelMapper.map(task, TaskDtoResponse.class))
                .collect(Collectors.toList());
    }

    public void deleteTask(Long id) {
        Task taskToDelete = taskRepository.findById(id)
                .orElseThrow(() -> new TaskDoesNotExistException(TASK_DOES_NOT_EXIST));

        taskRepository.delete(taskToDelete);
    }

    public TaskDtoResponse updateTask(Long id, TaskDto taskDto) {
        Task taskToUpdate = taskRepository.findById(id)
                .orElseThrow(() -> new TaskDoesNotExistException(TASK_DOES_NOT_EXIST));

        taskToUpdate.setDateOfLastUpdate(LocalDateTime.now());

        modelMapper.map(taskDto, taskToUpdate);
        return modelMapper.map(taskToUpdate, TaskDtoResponse.class);
    }

    public TaskDtoResponse finishTask(Long id, TaskDto taskDto) {
        Task taskToUpdate = taskRepository.findById(id)
                .orElseThrow(() -> new TaskDoesNotExistException(TASK_DOES_NOT_EXIST));

        taskToUpdate.setDateOfLastUpdate(LocalDateTime.now());
        taskToUpdate.setIsFinished(true);

        modelMapper.map(taskDto, taskToUpdate);
        return modelMapper.map(taskToUpdate, TaskDtoResponse.class);
    }

    public TaskDtoResponse unFinishTask(Long id, TaskDto taskDto) {
        Task taskToUpdate = taskRepository.findById(id)
                .orElseThrow(() -> new TaskDoesNotExistException(TASK_DOES_NOT_EXIST));

        taskToUpdate.setDateOfLastUpdate(LocalDateTime.now());
        taskToUpdate.setIsFinished(false);

        modelMapper.map(taskDto, taskToUpdate);
        return modelMapper.map(taskToUpdate, TaskDtoResponse.class);
    }

    public TaskDtoResponse addTask(TaskDto taskDto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserDoesNotExistException(USER_DOES_NOT_EXIST));

        Task taskToRegister = modelMapper.map(taskDto, Task.class);

        taskToRegister.setUser(user);
        taskToRegister.setDateOfCreation(LocalDateTime.now());
        taskToRegister.setDateOfLastUpdate(LocalDateTime.now());

        taskRepository.save(taskToRegister);

        return modelMapper.map(taskToRegister, TaskDtoResponse.class);
    }
}
