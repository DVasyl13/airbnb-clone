package com.example.app.utils;

import com.example.app.auth.dto.UserDto;
import com.example.app.controller.dto.LocationDto;
import com.example.app.entity.Listing;
import com.example.app.entity.Location;
import com.example.app.entity.User;

import java.util.Arrays;

public class Mapper {

    public static UserDto mapUser(User user) {
        Long[] favoriteIds = user.getFavourites()
                .stream()
                .map(Listing::getId)
                .toArray(Long[]::new);

        return new UserDto(
                user.getId(),
                user.getName(),
                user.getImage(),
                user.getEmail(),
                user.getCreatedAt(),
                favoriteIds
        );
    }

    public static UserDto mapUser(User user, Long[] favoriteIds) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getImage(),
                user.getEmail(),
                user.getCreatedAt(),
                favoriteIds
        );
    }

    public static LocationDto mapLocation(Location location) {
        int[] latlngArray = Arrays.stream(location.getLatlng().split(","))
                .mapToInt(Integer::parseInt)
                .toArray();

        return new LocationDto(
                location.getFlag(),
                location.getLabel(),
                latlngArray,
                location.getRegion(),
                location.getValue()
        );
    }
}
