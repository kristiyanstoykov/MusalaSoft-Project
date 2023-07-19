package com.example.todolistbackend.jwt;

public record JwtTokenRequest(String username, String password) {
    public JwtTokenRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String username() {
        return this.username;
    }

    public String password() {
        return this.password;
    }
}

