package com.example.todolistbackend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;

import com.example.todolistbackend.dto.UserDtoResponse;
import com.example.todolistbackend.model.User;
import com.example.todolistbackend.repository.UserRepository;
import com.example.todolistbackend.service.UserService;

public class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private UserService userService;

    private final ArgumentCaptor<String> stringCapture = ArgumentCaptor.forClass(String.class);

    private User testUser;
    private UserDtoResponse testUserDtoResponse;

    @BeforeEach
    void setUp() {
        testUser = new User(5L, "stoyan", "stoyan", "stoyan@test.test",
                "sto", "123456", null, null);

        testUserDtoResponse = new UserDtoResponse("stoyan", "stoyan",
                "sto", "stoyan@test.test", "123456", null, null);
    }

    @Test
    public void getUserTestException() throws Exception {
        Optional<User> result = Optional.empty();
        Mockito.when(userRepository.findByUsername(Mockito.anyString()))
                .thenReturn(result);
        // assertThrows(UserDoesNotExistException.class, () ->
        // userService.getUser("someName"));
    }

    @Test
    public void getUserTest() {

        Optional<User> result = Optional
                .of(testUser);
        Mockito.when(userRepository.findByUsername(stringCapture.capture()))
                .thenReturn(result);
        UserDtoResponse userResponse = userService.getUser("someName");
        UserDtoResponse expectedResult = testUserDtoResponse;
        assertEquals("someName", stringCapture.getValue());
        assertEquals(expectedResult, userResponse);

    }
}
