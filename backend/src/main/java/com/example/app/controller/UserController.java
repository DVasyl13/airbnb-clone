package com.example.app.controller;

import com.example.app.auth.dto.UserDto;
import com.example.app.service.ListingService;
import com.example.app.service.UserService;
import com.example.app.utils.Mapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ListingService listingService;

    @GetMapping
    public ResponseEntity<UserDto> getUser(HttpServletRequest request) {
        return ResponseEntity.ok(Mapper.mapUser(userService.getUserFromJwt(request)));
    }

    @PostMapping("/listing/{id}")
    public ResponseEntity<Long> addListing(@PathVariable Long id, HttpServletRequest request) {
        return ResponseEntity.ok(listingService.addToFavourite(id, request));
    }

    @DeleteMapping("/listing/{id}")
    public ResponseEntity<Long> deleteListing(@PathVariable Long id, HttpServletRequest request) {
        return ResponseEntity.ok(listingService.deleteFromFavourite(id, request));
    }
}