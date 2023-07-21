package com.example.todolistbackend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;

import com.example.todolistbackend.dto.TaskDtoResponse;
import com.example.todolistbackend.exception.TaskDoesNotExistException;
import com.example.todolistbackend.model.Task;
import com.example.todolistbackend.repository.TaskRepository;
import com.example.todolistbackend.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.Optional;

class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private TaskService taskService;

    private final Long taskId = 1L;
    private final Task taskToDelete = new Task();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // @Test
    // void testGetTaskWithExistingId() {
    // Long taskId = 1L;
    // Task task = new Task();
    // task.setTaskId(taskId);

    // TaskDtoResponse taskDtoResponse = new TaskDtoResponse();
    // taskDtoResponse.setTaskId(taskId);

    // when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

    // when(modelMapper.map(task,
    // TaskDtoResponse.class)).thenReturn(taskDtoResponse);

    // TaskDtoResponse result = taskService.getTask(taskId);

    // assertEquals(taskId, result.getTaskId());
    // }

    @Test
    void testDeleteExistingTask() {
        taskToDelete.setTaskId(taskId);

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(taskToDelete));

        taskService.deleteTask(taskId);

        verify(taskRepository, times(1)).delete(taskToDelete);
    }
}
