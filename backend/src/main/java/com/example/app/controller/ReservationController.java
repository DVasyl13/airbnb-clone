package com.example.app.controller;

import com.example.app.controller.dto.ReservationDto;
import com.example.app.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservation")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @GetMapping("/{id}")
    public ResponseEntity<List<ReservationDto>> getReservationsById(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.getReservationsById(id));
    }
}
