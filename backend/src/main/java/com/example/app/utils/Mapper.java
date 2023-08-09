package com.example.app.utils;

import com.example.app.auth.dto.UserDto;
import com.example.app.controller.dto.*;
import com.example.app.entity.Listing;
import com.example.app.entity.Location;
import com.example.app.entity.Reservation;
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

    public static ReservationDto mapReservation(Reservation reservation) {
        return new ReservationDto(
                reservation.getId(), reservation.getStartDate(),
                reservation.getEndDate(), reservation.getTotalPrice(),
                reservation.getCreatedAt()
        );
    }

    public static ReservationExtendedDto mapReservationExtended(Reservation reservation) {
        return new ReservationExtendedDto(
                reservation.getId(), reservation.getStartDate(),
                reservation.getEndDate(), reservation.getTotalPrice(),
                reservation.getCreatedAt(), mapListing(reservation.getListing())
        );
    }

    public static ListingDto mapListing(Listing l) {
        var user = l.getUser();
        return new ListingDto( l.getId(),
                l.getPrice(), l.getTitle(),
                l.getDescription(), Mapper.mapLocation(l.getLocation()),
                l.getCategory(), l.getRoomCount(),
                l.getGuestCount(), l.getBathroomCount(),
                l.getCreatedAt() , l.getImageSrc(),
                new UserSmallDto(user.getId(), user.getName(), user.getImage())
        );
    }
}
