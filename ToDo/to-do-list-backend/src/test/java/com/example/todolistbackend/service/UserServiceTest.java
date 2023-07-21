package com.example.todolistbackend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
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

import com.example.todolistbackend.dto.UserDto;
import com.example.todolistbackend.dto.UserDtoResponse;
import com.example.todolistbackend.exception.UserDoesNotExistException;
import com.example.todolistbackend.exception.UserWithGivenEmailAlreadyExistsException;
import com.example.todolistbackend.exception.UserWithGivenUsernameAlreadyExistsException;
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

        private final UserDtoResponse testResponse = new UserDtoResponse("stoyan", "stoyan", "sto", "stoyan@test.test",
                        "123456", null, null);

        private final User testUserUpdated = new User(5L, "update", "update",
                        "update@test.test", "upd", "654321", null, null);
        private final UserDtoResponse testResponseUpdate = new UserDtoResponse("update", "update", "upd",
                        "update@test.test", "654321", null, null);
        private final UserDto userDtoUpdate = new UserDto("update", "update", "upd",
                        "update@test.test", "654321", null, null);

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

                Mockito.when(userRepository.findByUsername("sto"))
                                .thenReturn(Optional.of(testUser));
                Mockito.when(userRepository.findByUsername("upd"))
                                .thenReturn(Optional.empty());
                Mockito.when(userRepository.findByEmail("update@test.test"))
                                .thenReturn(Optional.empty());
                Mockito.when(userRepository.save(any(User.class)))
                                .thenReturn(testUserUpdated);
                Mockito.when(modelMapper.map(any(UserDto.class), eq(User.class)))
                                .thenReturn(testUserUpdated);
                Mockito.when(modelMapper.map(any(User.class), eq(UserDtoResponse.class)))
                                .thenReturn(testResponseUpdate);

                // Call updateUser
                UserDtoResponse updatedUserDtoResponse = userService.updateUser("sto", userDtoUpdate);

                // Verify the result
                assertEquals(testResponseUpdate, updatedUserDtoResponse);

                // Verify the interactions with the mocks
                Mockito.verify(userRepository, times(2)).findByUsername(anyString());
                Mockito.verify(userRepository, times(1)).findByEmail(anyString());
                Mockito.verify(userRepository, times(1)).save(any(User.class));

        }

        @Test
        public void updateUser_UserDoesNotExistException() throws Exception {
                UserDto userDtoUpdate = new UserDto("update", "update", "upd",
                                "update@test.test", "654321", null, null);

                Mockito.when(userRepository.findByUsername("sto"))
                                .thenReturn(Optional.empty());

                assertThrows(UserDoesNotExistException.class, () -> {
                        userService.updateUser("sto", userDtoUpdate);
                });
        }

        @Test
        public void updateUser_UserWithGivenUsernameAlreadyExistsException() throws Exception {
                UserDto userDtoUpdate = new UserDto("update", "update", "upd",
                                "update@test.test", "654321", null, null);

                Mockito.when(userRepository.findByUsername("sto"))
                                .thenReturn(Optional.of(testUser));
                Mockito.when(userRepository.findByUsername("upd"))
                                .thenReturn(Optional.of(testUserUpdated));

                assertThrows(UserWithGivenUsernameAlreadyExistsException.class, () -> {
                        userService.updateUser("sto", userDtoUpdate);
                });
        }

        @Test
        public void updateUser_UserWithGivenEmailAlreadyExistsException() throws Exception {
                UserDto userDtoUpdate = new UserDto("update", "update", "upd",
                                "update@test.test", "654321", null, null);

                Mockito.when(userRepository.findByUsername("sto"))
                                .thenReturn(Optional.of(testUser));
                Mockito.when(userRepository.findByUsername("upd"))
                                .thenReturn(Optional.empty());
                Mockito.when(userRepository.findByEmail("update@test.test"))
                                .thenReturn(Optional.of(testUserUpdated));

                assertThrows(UserWithGivenEmailAlreadyExistsException.class, () -> {
                        userService.updateUser("sto", userDtoUpdate);
                });
        }

        @Test
        public void deleteUserTest() {

                Mockito.when(userRepository.findByUsername("sto"))
                                .thenReturn(Optional.of(testUser));

                Mockito.doNothing().when(userRepository).delete(any(User.class));

                userService.deleteUser("sto");

                Mockito.verify(userRepository, times(1)).findByUsername("sto");
                Mockito.verify(userRepository, times(1)).delete(any(User.class));
        }

        @Test
        public void deleteUserTest_UserDoesNotExistException() throws Exception {

                Mockito.when(userRepository.findByUsername("sto"))
                                .thenReturn(Optional.empty());

                assertThrows(UserDoesNotExistException.class, () -> {
                        userService.deleteUser("sto");
                });
        }

        @Test
        public void registerUserTest() {

                UserDto userDtoRegister = new UserDto("stoyan", "stoyan", "sto",
                                "stoyan@test.test", "123456", null, null);

                Mockito.when(userRepository.findByUsername("sto"))
                                .thenReturn(Optional.empty());
                Mockito.when(userRepository.findByEmail("stoyan@test.test"))
                                .thenReturn(Optional.empty());
                Mockito.when(userRepository.save(any(User.class)))
                                .thenReturn(testUser);
                Mockito.when(modelMapper.map(any(UserDto.class), eq(User.class)))
                                .thenReturn(testUser);
                Mockito.when(modelMapper.map(any(User.class), eq(UserDtoResponse.class)))
                                .thenReturn(testResponse);

                UserDtoResponse registeredUserDtoResponse = userService.registerUser(userDtoRegister);

                assertEquals(testResponse, registeredUserDtoResponse);

                Mockito.verify(userRepository, times(1)).findByUsername(anyString());
                Mockito.verify(userRepository, times(1)).findByEmail(anyString());
                Mockito.verify(userRepository, times(1)).save(any(User.class));
        }

        @Test
        public void registerUserTest_UserWithGivenEmailAlreadyExistsException() {
                UserDto userDtoRegister = new UserDto("register", "register", "reg",
                                "register@test.test", "654321", null, null);

                Mockito.when(userRepository.findByUsername("reg"))
                                .thenReturn(Optional.empty());
                Mockito.when(userRepository.findByEmail("register@test.test"))
                                .thenReturn(Optional.of(testUser));

                assertThrows(UserWithGivenEmailAlreadyExistsException.class, () -> {
                        userService.registerUser(userDtoRegister);
                });
        }

        @Test
        public void registerUserTest_UserWithGivenUsernameAlreadyExistsException() throws Exception {
                UserDto userDtoRegister = new UserDto("register", "register", "reg",
                                "register@test.test", "654321", null, null);

                Mockito.when(userRepository.findByUsername("reg"))
                                .thenReturn(Optional.of(testUser));

                assertThrows(UserWithGivenUsernameAlreadyExistsException.class, () -> {
                        userService.registerUser(userDtoRegister);
                });
        }
}
