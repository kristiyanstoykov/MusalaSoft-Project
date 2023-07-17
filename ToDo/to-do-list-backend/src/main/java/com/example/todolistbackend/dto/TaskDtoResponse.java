package com.example.todolistbackend.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotEmpty;

public class TaskDtoResponse {
    @NotEmpty
    private String title;

    @NotEmpty
    private String description;
    
    @NotEmpty
    @JsonFormat(pattern = "hh:mm dd-MM-yyyy")
    private LocalDate timeOfCreation;

    @NotEmpty
    @JsonFormat(pattern = "hh:mm dd-MM-yyyy")
    private LocalDate dateOfExpiration;

    @NotEmpty
    @JsonFormat(pattern = "hh:mm dd-MM-yyyy")
    private LocalDate dateOfLastUpdate;

    @NotEmpty
    private Boolean isFinished;

    @NotEmpty
    private String password;
}
