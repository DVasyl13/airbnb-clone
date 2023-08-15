package com.example.app.controller;

import com.example.app.controller.dto.ListingDto;
import com.example.app.service.ListingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/listing")
@RequiredArgsConstructor
@Tag(name = "Listing")
public class ListingController {
    private final ListingService listingService;

    @PostMapping
    public ResponseEntity<ListingDto> saveListing(@RequestBody ListingDto requestBody, HttpServletRequest request) {
        return ResponseEntity.ok(listingService.saveListing(requestBody, request));
    }
    @GetMapping("/all")
    public ResponseEntity<List<ListingDto>> getListing() {
        return ResponseEntity.ok(listingService.getAllListings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingDto> getListingById(@PathVariable Long id) {
        return ResponseEntity.ok(listingService.getListingById(id));
    }
}
