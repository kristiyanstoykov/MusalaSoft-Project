package com.example.todolistbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "task_id")
    private Long taskId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "date_of_creation")
    private LocalDate dateOfCreation;

    @Column(name = "date_of_expiration", nullable = false)
    private LocalDate dateOfExpiration;

    @Column(name = "date_of_last_update", nullable = false)
    private LocalDate dateOfLastUpdate;

    @Column(name = "is_finished")
    private Boolean isFinished;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;
}