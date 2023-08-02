package com.example.app.auth;

import com.example.app.auth.dto.AuthenticationRequest;
import com.example.app.auth.dto.AuthenticationResponse;
import com.example.app.auth.dto.RegisterRequest;
import com.example.app.entity.User;
import com.example.app.exception.UserAlreadyExistException;
import com.example.app.exception.UserIsLockedException;
import com.example.app.exception.WrongPasswordException;
import com.example.app.repository.UserRepository;
import com.example.app.security.JwtService;
import com.example.app.security.token.Token;
import com.example.app.security.token.TokenRepository;
import com.example.app.security.token.TokenType;
import com.example.app.utils.UserRole;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthenticationManager authManager;
    private final BCryptPasswordEncoder passwordEncoder;
    @Transactional
    public AuthenticationResponse register(RegisterRequest request,
                                           final HttpServletRequest httpRequest) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new UserAlreadyExistException(request.email());
        }

        User user = new User(request.name(),
                passwordEncoder.encode(request.password()),
                request.email(), UserRole.USER);
        user.setIsEnable(false);
        User savedUser = userRepository.save(user);
        String jwtToken = getJwtToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        //publisher.publishEvent(new RegistrationCompleteEvent(user, jwtToken, getApplicationUrl(httpRequest)));
        return new AuthenticationResponse(jwtToken, refreshToken, savedUser);
    }

//    private String getApplicationUrl(HttpServletRequest request) {
//        return "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
//    }

    @Transactional
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("User with [" + request.email() + "] was not found"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new WrongPasswordException(request.email());
        }
        if (user.getIsLocked()) {
            throw new UserIsLockedException("User with [" + request.email() + "] is locked");
        }
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        String jwtToken = getJwtToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return new AuthenticationResponse(jwtToken, refreshToken, user);
    }

    private String getJwtToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        return jwtService.generateToken(claims, user);
    }


    private void saveUserToken(User user, String jwtToken) {
        Token token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        Set<Token> validTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validTokens.isEmpty())
            return;
        validTokens.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });
        tokenRepository.saveAll(validTokens);
    }

    @Transactional
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = new AuthenticationResponse(
                        accessToken,
                        refreshToken,
                        null
                );
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
