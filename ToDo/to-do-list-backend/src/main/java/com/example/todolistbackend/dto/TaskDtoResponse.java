package com.example.todolistbackend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class TaskDtoResponse {
    @NotBlank
    private Long taskId;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    @JsonFormat(pattern = "HH:mm dd-MM-yyyy")
    private LocalDateTime timeOfCreation;

    @NotBlank
    @JsonFormat(pattern = "HH:mm dd-MM-yyyy")
    private LocalDateTime dateOfExpiration;

    @NotBlank
    @JsonFormat(pattern = "HH:mm dd-MM-yyyy")
    private LocalDateTime dateOfLastUpdate;

    @NotBlank
    private Boolean isFinished;
}
