package com.example.todolistbackend.exception;

public class UsernameAlreadyInUseException extends RuntimeException{

    public UsernameAlreadyInUseException(String message){super(message); }

}
