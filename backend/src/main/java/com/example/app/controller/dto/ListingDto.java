package com.example.app.controller.dto;

public record ListingDto(Long id,
                         double price,
                         String title,
                         String description,
                         LocationDto location,
                         String category,
                         int roomCount,
                         int guestCount,
                         int bathroomCount,
                         String imageSrc) {
}
