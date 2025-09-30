package com.taskmanagerApi.taskmanager.exception;

public class AccountBlockedException extends RuntimeException{
    public AccountBlockedException(String message){
        super(message);
    }
}
