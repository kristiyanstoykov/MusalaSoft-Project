package com.example.todolistbackend.exception;

public class UserWithGivenEmailAlreadyExistsException extends RuntimeException{

public UserWithGivenEmailAlreadyExistsException(String message){super(message); }
}
