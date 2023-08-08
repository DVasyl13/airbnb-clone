package com.example.app.service;

import com.example.app.controller.dto.ReservationDto;
import com.example.app.repository.ReservationRepository;
import com.example.app.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository resRepository;

    @Transactional
    public List<ReservationDto> getReservationsById(Long id) {
        return resRepository.findByListingId(id)
                .stream()
                .map(Mapper::mapReservation)
                .collect(Collectors.toList());
    }
}
