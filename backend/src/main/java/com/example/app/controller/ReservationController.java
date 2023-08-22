package com.example.app.controller;

import com.example.app.controller.dto.ReservationDto;
import com.example.app.controller.dto.ReservationExtendedDto;
import com.example.app.service.ReservationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservation")
@RequiredArgsConstructor
@Tag(name = "Reservation")
public class ReservationController {
    private final ReservationService reservationService;

    @GetMapping("/listing/{id}")
    public ResponseEntity<List<ReservationDto>> getReservationsByListingId(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.getReservationsByListingId(id));
    }

    @GetMapping
    public ResponseEntity<List<ReservationExtendedDto>> getReservationsByUser(HttpServletRequest request) {
        return ResponseEntity.ok(reservationService.getReservationsByUser(request));
    }

    @PostMapping
    public ResponseEntity<ReservationDto> saveReservation(@RequestBody ReservationDto reservationDto,
                                                          HttpServletRequest request) {
        return ResponseEntity.ok(reservationService.saveReservation(reservationDto, request));
    }
}
