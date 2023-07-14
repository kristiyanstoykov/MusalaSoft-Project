package com.example.todolistbackend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {
    @NotEmpty
    private String description;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime dateAndTimeOfCreation;

    @NotNull
    private boolean isFinished;
}