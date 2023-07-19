package com.example.todolistbackend.exception;

public class UserWithGivenUsernameAlreadyExistsException extends RuntimeException{

    public UserWithGivenUsernameAlreadyExistsException(String message){super(message); }
}
