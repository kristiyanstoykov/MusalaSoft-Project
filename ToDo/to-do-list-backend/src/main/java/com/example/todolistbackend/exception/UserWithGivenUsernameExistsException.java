package com.example.todolistbackend.exception;

public class UserWithGivenUsernameExistsException extends RuntimeException{

    public UserWithGivenUsernameExistsException(String message){super(message); }
}
