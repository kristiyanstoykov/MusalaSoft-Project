package com.example.todolistbackend.controller;

import com.example.todolistbackend.dto.UserDto;
import com.example.todolistbackend.dto.UserDtoResponse;
import com.example.todolistbackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/to_do_list_system/users")
public class UserController {

    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping(path = "/{email}/get-user")
    public UserDtoResponse getUser(@PathVariable("email") String email) {
        return userService.getUser(email);
    }

    @PostMapping(path = "/register-user")
    public UserDtoResponse registerUser(@Valid @RequestBody UserDto userDto) {
        return userService.registerUser(userDto);
    }

    @PutMapping(path = "/{username}/update-user")
    public UserDtoResponse updateUser(@PathVariable("username") String username,
                                      @Valid @RequestBody UserDto userDto) {
        return userService.updateUser(username, userDto);
    }

    @DeleteMapping(path = "/{username}/delete-user")
    public ResponseEntity<Void> deleteUser(@PathVariable("username") String username) {
        userService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }
}
