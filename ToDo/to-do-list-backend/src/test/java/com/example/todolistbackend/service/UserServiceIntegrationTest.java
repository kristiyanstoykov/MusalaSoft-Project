package com.example.todolistbackend.service;

import com.example.todolistbackend.dto.UserDto;
import com.example.todolistbackend.exception.UserWithGivenUsernameExistsException;
import com.example.todolistbackend.model.User;
import com.example.todolistbackend.repository.UserRepository;
import net.bytebuddy.asm.Advice;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceIntegrationTest {

    @Autowired
    private UserService userService;

    @Test(expected = IllegalStateException.class)
    public void shouldThrowUserWithGivenUsernameExistsException() {
        UserDto userDto = new UserDto(
                "Zahari1",
                "Nikiforov2",
                "ivanivan",
                "zaharii@gmail.com",
                "3333",
                LocalDate.of(2000, 6, 6)
        );

        userService.registerUser(userDto);
    }

}
