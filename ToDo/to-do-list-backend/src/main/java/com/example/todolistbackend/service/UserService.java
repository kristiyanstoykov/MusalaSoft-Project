package com.example.todolistbackend.service;

import com.example.todolistbackend.dto.UserDto;
import com.example.todolistbackend.dto.UserDtoResponse;
import com.example.todolistbackend.model.User;
import com.example.todolistbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import org.springframework.ui.Model;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.modelMapper = new ModelMapper();
    }

    public UserDtoResponse getUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("no such user"));

        //TO-DO: Add custom exceptions

        return modelMapper.map(user, UserDtoResponse.class);
    }

    public UserDtoResponse registerUser(UserDto userDto) {

        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new IllegalStateException("email taken");
        }

        if (userRepository.findByEmail(userDto.getUsername()).isPresent()) {
            throw new IllegalStateException("username taken");
        }

        User userToRegister = modelMapper.map(userDto, User.class);
        userRepository.save(userToRegister);

        return modelMapper.map(userToRegister, UserDtoResponse.class);

    }

}
