package com.example.app.auth.dto;

import org.springframework.security.core.userdetails.UserDetails;

public record AuthenticationResponse(String token, String refreshToken, UserDetails user) {
}
