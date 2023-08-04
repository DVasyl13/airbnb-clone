package com.example.app.controller;

import com.example.app.controller.dto.ListingDto;
import com.example.app.service.ListingService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/listing")
@RequiredArgsConstructor
public class ListingController {
    private final ListingService listingService;

    @PostMapping
    public ResponseEntity<ListingDto> saveListing(@RequestBody ListingDto requestBody, HttpServletRequest request ) {
        return ResponseEntity.ok(listingService.saveListing(requestBody, request));
    }
}
