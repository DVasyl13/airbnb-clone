package com.example.app.auth.dto;

import java.util.Date;

public record UserDto(Long id, String name, String image,
                      String email, Date createdAt, Long[] favoriteIds) {
}
