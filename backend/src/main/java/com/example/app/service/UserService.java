package com.example.app.service;

import com.example.app.entity.User;
import com.example.app.exception.UserNotFoundException;
import com.example.app.repository.UserRepository;
import com.example.app.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final JwtService jwtService;

    @Transactional
    public User getUserFromJwt(HttpServletRequest request) {
        return getUserFromRequest(request);
    }

    private User getUserFromRequest(HttpServletRequest request) {
        String userEmail = getUserEmailFromRequest(request);
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException(userEmail));
    }

    private String getUserEmailFromRequest(HttpServletRequest request) {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        String jwt = header.substring(7);
        return jwtService.extractUsername(jwt);
    }

}