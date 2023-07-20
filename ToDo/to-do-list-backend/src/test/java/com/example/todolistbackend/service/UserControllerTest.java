package com.example.todolistbackend.service;

import org.mockito.Mock;
import org.mockito.MockingDetails;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.example.todolistbackend.controller.UserController;
import com.example.todolistbackend.service.UserService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import com.example.todolistbackend.dto.UserDtoResponse;
import com.example.todolistbackend.jwt.JwtTokenService;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;

@WebMvcTest(UserController.class)
public class UserControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private JwtTokenService tokenService;

        @MockBean
        private UserService userService;

        @Test
        public void getUserTest() throws Exception {
                Mockito.when(userService.getUser(Mockito.anyString()))
                                .thenReturn(new UserDtoResponse());
                mockMvc.perform(
                                get("/users/pe6o")
                                                .header("authentication", "Bearer " + tokenService.generateToken(null))
                                                .contentType(APPLICATION_JSON_VALUE))
                                .andExpect(status().isUnauthorized());

                // Mockito.verify(userService, Mockito.only()).getUser(Mockito.anyString());
        }
}
