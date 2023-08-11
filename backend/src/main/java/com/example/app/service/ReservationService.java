package com.example.app.service;

import com.example.app.controller.dto.ReservationDto;
import com.example.app.controller.dto.ReservationExtendedDto;
import com.example.app.entity.Listing;
import com.example.app.entity.Reservation;
import com.example.app.entity.User;
import com.example.app.repository.ListingRepository;
import com.example.app.repository.ReservationRepository;
import com.example.app.utils.Mapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository resRepository;
    private final ListingRepository listingRepository;
    private final UserService userService;

    @Transactional
    public List<ReservationDto> getReservationsById(Long id) {
        return resRepository.findByListingId(id)
                .stream()
                .map(Mapper::mapReservation)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReservationDto saveReservation(ReservationDto reservation, HttpServletRequest request) {
        User user = userService.getUserFromJwt(request);
        Reservation res = new Reservation(reservation.startDate(), reservation.endDate(),
                reservation.totalPrice(), new Date());
        Listing listing = listingRepository.findById(reservation.id()).orElseThrow();
        res.setListing(listing);
        res.setUser(user);
        resRepository.save(res);
        return new ReservationDto(
            res.getId(), res.getStartDate(), res.getEndDate(),
            res.getTotalPrice(), res.getCreatedAt()
        );
    }

    @Transactional
    public Long deleteReservation(Long id, HttpServletRequest request) {
        User user = userService.getUserFromJwt(request);
        Reservation reservation = resRepository.findById(id).orElseThrow();
        user.getReservations().remove(reservation);
        resRepository.delete(reservation);
        return id;
    }

    @Transactional
    public List<ReservationExtendedDto> getReservationsByUser(HttpServletRequest request) {
        User user = userService.getUserFromJwt(request);
        return user.getReservations()
                .stream()
                .map(Mapper::mapReservationExtended)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<ReservationExtendedDto> getReservationsByUsersListings(HttpServletRequest request) {
        User user = userService.getUserFromJwt(request);
        return user.getListings().stream()
                .flatMap(listing -> listing.getReservations().stream())
                .map(Mapper::mapReservationExtended)
                .collect(Collectors.toList());
    }
}
