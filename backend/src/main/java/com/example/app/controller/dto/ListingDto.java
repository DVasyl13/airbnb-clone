package com.example.app.controller.dto;

import java.util.Date;

public record ListingDto(Long id, double price, String title,
                         String description, LocationDto location, String category,
                         int roomCount, int guestCount, int bathroomCount,
                         Date createdAt, String imageSrc, UserSmallDto user) {
}
