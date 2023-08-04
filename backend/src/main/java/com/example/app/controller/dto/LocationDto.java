package com.example.app.controller.dto;

public record LocationDto(String flag, String label, int[] latlng, String region, String value) {
}
