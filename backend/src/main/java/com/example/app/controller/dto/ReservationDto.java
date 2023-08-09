package com.example.app.controller.dto;

import java.util.Date;

public record ReservationDto(Long id, Date startDate, Date endDate, double totalPrice,
         Date createdAt) {
}
