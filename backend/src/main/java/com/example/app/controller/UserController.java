package com.example.app.controller;

import com.example.app.controller.dto.ListingDto;
import com.example.app.controller.dto.ReservationExtendedDto;
import com.example.app.service.ListingService;
import com.example.app.service.UserService;
import com.example.app.auth.dto.UserDto;
import com.example.app.service.ReservationService;
import com.example.app.utils.Mapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {
    private final UserService userService;
    private final ListingService listingService;
    private final ReservationService reservationService;

    @GetMapping
    public ResponseEntity<UserDto> getUser(HttpServletRequest request) {
        return ResponseEntity.ok(Mapper.mapUser(userService.getUserFromJwt(request)));
    }

    @GetMapping("/listing")
    public ResponseEntity<List<ListingDto>> getUsersListings(HttpServletRequest request) {
        return ResponseEntity.ok(listingService.getUserListings(request));
    }

    @GetMapping("/listing/favourite")
    public ResponseEntity<List<ListingDto>> getUsersFavouriteListings(HttpServletRequest request) {
        return ResponseEntity.ok(listingService.getUserFavouriteListings(request));
    }

    @GetMapping("/listing/reservation")
    public ResponseEntity<List<ReservationExtendedDto>> getUsersListingsReservations(HttpServletRequest request) {
        return ResponseEntity.ok(reservationService.getReservationsByUsersListings(request));
    }

    @PostMapping("/listing/{id}")
    public ResponseEntity<Long> addListingToFavourite(@PathVariable Long id, HttpServletRequest request) {
        return ResponseEntity.ok(listingService.addToFavourite(id, request));
    }

    @DeleteMapping("/listing/{id}")
    public ResponseEntity<Long> deleteListing(@PathVariable Long id, HttpServletRequest request) {
        return ResponseEntity.ok(listingService.deleteListing(id, request));
    }

    @DeleteMapping("/listing/favourite/{id}")
    public ResponseEntity<Long> deleteListingFromFavourite(@PathVariable Long id, HttpServletRequest request) {
        return ResponseEntity.ok(listingService.deleteFromFavourite(id, request));
    }
    @DeleteMapping("/reservation/{id}")
    public ResponseEntity<Long> deleteUserReservation(@PathVariable Long id, HttpServletRequest request) {
        return ResponseEntity.ok(reservationService.deleteReservation(id, request));
    }
}