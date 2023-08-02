package com.example.app.exception;

public class UserIsLockedException extends RuntimeException{
    public UserIsLockedException(String s) {
        super(s);
    }
}