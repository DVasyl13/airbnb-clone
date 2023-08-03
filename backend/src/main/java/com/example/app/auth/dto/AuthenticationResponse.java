package com.example.app.auth.dto;

import com.example.app.entity.User;

public record AuthenticationResponse(String token, String refreshToken, User user) {
}
