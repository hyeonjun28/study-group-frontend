package com.example.demo;

public class AuthResponse {
    public boolean success;
    public String message;

    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
