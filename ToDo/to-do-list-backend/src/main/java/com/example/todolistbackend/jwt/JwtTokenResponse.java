package com.example.todolistbackend.jwt;

public record JwtTokenResponse(String token) {
    public JwtTokenResponse(String token) {
        this.token = token;
    }

    public String token() {
        return this.token;
    }
}