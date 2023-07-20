package com.example.todolistbackend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.todolistbackend.dto.UserDtoResponse;
import com.example.todolistbackend.exception.UserDoesNotExistException;
import com.example.todolistbackend.model.User;
import com.example.todolistbackend.repository.UserRepository;
import com.example.todolistbackend.service.UserService;

@ExtendWith(SpringExtension.class)
public class UserServiceTest {
        @Mock
        private UserRepository userRepository;
        @Mock
        private ModelMapper modelMapper;

        @InjectMocks
        private UserService userService;

        private final User testUser = new User(5L, "stoyan", "stoyan",
                        "stoyan@test.test", "sto", "123456", null, null);

        private final User testUserUpdated = new User(5L, "update", "update",
                        "update@test.test", "upd", "654321", null, null);

        private final UserDtoResponse testResponse = new UserDtoResponse("stoyan", "stoyan", "sto", "stoyan@test.test",
                        "123456", null, null);

        private final UserDtoResponse testResponseUpdate = new UserDtoResponse("update", "update", "upd",
                        "update@test.test",
                        "654321", null, null);

        private final ArgumentCaptor<String> stringCapture = ArgumentCaptor.forClass(String.class);

        @Test
        public void getUserTestException() throws Exception {
                Optional<User> result = Optional.empty();

                Mockito.when(userRepository.findByUsername(Mockito.anyString()))
                                .thenReturn(result);
                assertThrows(UserDoesNotExistException.class, () -> userService.getUser("someName"));
        }

        @Test
        public void getUserTest() {

                Optional<User> result = Optional
                                .of(testUser);
                Mockito.when(userRepository.findByUsername(stringCapture.capture()))
                                .thenReturn(result);
                UserDtoResponse userResponse = userService.getUser("sto");
                UserDtoResponse expectedResult = testResponse;

                assertEquals("sto", stringCapture.getValue());
                assertEquals(expectedResult, userResponse);
        }

        @Test
        public void loadUserByUsernameTest() {
                String userName = "sto";

                UserDetails expectedUserDetails = new org.springframework.security.core.userdetails.User(
                                testUser.getUsername(),
                                "{noop}" + testUser.getPassword(),
                                AuthorityUtils.createAuthorityList("read"));

                Mockito.when(userRepository.findByUsername(userName)).thenReturn(Optional.of(testUser));

                UserDetails actualUserDetails = userService.loadUserByUsername(userName);

                assertEquals(expectedUserDetails.getUsername(), actualUserDetails.getUsername());
        }

        @Test
        public void updateUserTest() {
                when(userRepository.findByUsername("sto"))
                        .thenReturn(Optional.of(testUser));
                when(userRepository.findByUsername("upd"))
                        .thenReturn(Optional.of(testUserUpdated));
                when(userRepository.findByEmail("update@test.test"))
                        .thenReturn(Optional.empty());
                when(userRepository.save(any(User.class)))
                        .thenReturn(testUserUpdated);

                when(modelMapper.map(testResponseUpdate, User.class))
                .thenReturn(testUserUpdated);
                // when(modelMapper.map(testUserUpdated, UserDtoResponse.class))
                //         .thenReturn(new UserDtoResponse(testUserUpdated.getUsername(), 
                //         testUserUpdated.getEmail()));
                // TODO: Finish updateUserTest
        }

}
