package com.example.todolistbackend.service;

import org.mockito.Mock;
import org.mockito.MockingDetails;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultHandler;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.example.todolistbackend.controller.UserController;
import com.example.todolistbackend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.example.todolistbackend.dto.UserDto;
import com.example.todolistbackend.dto.UserDtoResponse;
import com.example.todolistbackend.jwt.JwtTokenService;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.apache.tomcat.util.http.parser.MediaType;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

@WebMvcTest(UserController.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private JwtTokenService tokenService;

        @MockBean
        private UserService userService;

        // Currently not working
        @Test
        public void getUserTest() throws Exception {

                // Mock the expected UserDtoResponse
                UserDtoResponse expectedResponse = new UserDtoResponse("stoyan", "stoyan", "stoyan", "stoyan@email.com",
                                "123456", null, null);
                Mockito.when(userService.getUser("stoyan"))
                                .thenReturn(null);

                // Perform the GET request to /users/stoyan
                this.mockMvc.perform(MockMvcRequestBuilders.get("/users/stoyan"))
                                .andExpect(status().isOk())
                                .andExpect(content().json(new ObjectMapper().writeValueAsString(expectedResponse)));
        }
}
