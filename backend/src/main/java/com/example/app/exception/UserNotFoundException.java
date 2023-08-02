package com.example.app.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String s){
        super("User ["+s+"] was not found!");
    }
}