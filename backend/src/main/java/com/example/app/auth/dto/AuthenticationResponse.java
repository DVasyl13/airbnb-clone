package com.example.app.auth.dto;

public record AuthenticationResponse(String token, String refreshToken, UserDto user) {
}
