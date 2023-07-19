package com.example.todolistbackend.service;

import com.example.todolistbackend.dto.UserDto;
import com.example.todolistbackend.dto.UserDtoResponse;
import com.example.todolistbackend.exception.UserWithGivenEmailAlreadyExistsException;
import com.example.todolistbackend.exception.UserDoesNotExistException;
import com.example.todolistbackend.exception.UserWithGivenUsernameAlreadyExistsException;
import com.example.todolistbackend.model.User;
import com.example.todolistbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import org.springframework.ui.Model;
import org.springframework.security.core.userdetails.UserDetailsService;

import static com.example.todolistbackend.common.ExceptionMessages.*;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.modelMapper = new ModelMapper();
    }

    public UserDtoResponse getUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserDoesNotExistException(USER_DOES_NOT_EXIST));

        return modelMapper.map(user, UserDtoResponse.class);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User byUsername = userRepository.findByUsername(username).get();


        UserDetails user = org.springframework.security.core.userdetails.User.withUsername(username)
                .password("{noop}" + byUsername.getPassword())
                .authorities("read")
                .roles("USER")
                .build();

        return user;
    }

    public UserDtoResponse updateUser(String username, UserDto userDto) {
        User userToUpdate = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserDoesNotExistException(USER_DOES_NOT_EXIST));

        if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new UserWithGivenUsernameAlreadyExistsException(DESIRED_USERNAME_ALREADY_IN_USE);
        }

        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new UserWithGivenEmailAlreadyExistsException(DESIRED_EMAIL_ALREADY_IN_USE);
        }

        modelMapper.map(userDto, userToUpdate);
        return modelMapper.map(userRepository.save(userToUpdate), UserDtoResponse.class);
    }

    public void deleteUser(String username) {
        User userToDelete = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserDoesNotExistException(USER_DOES_NOT_EXIST));

        userRepository.delete(userToDelete);
    }

    public UserDtoResponse registerUser(UserDto userDto) {

        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new UserWithGivenEmailAlreadyExistsException(DESIRED_EMAIL_ALREADY_IN_USE);
        }

        if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new UserWithGivenUsernameAlreadyExistsException(DESIRED_USERNAME_ALREADY_IN_USE);
        }

        User userToRegister = modelMapper.map(userDto, User.class);
        userRepository.save(userToRegister);

        return modelMapper.map(userToRegister, UserDtoResponse.class);
    }
}
