package com.example.todolistbackend.repository;

import java.util.List;
import java.util.Optional;

import com.example.todolistbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.todolistbackend.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findById(Long id);
    List<Task> findAllByUser(User user);

}
