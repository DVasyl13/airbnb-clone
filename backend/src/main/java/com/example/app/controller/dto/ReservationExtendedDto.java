package com.example.app.controller.dto;

import java.util.Date;

public record ReservationExtendedDto(Long id, Date startDate, Date endDate, double totalPrice,
                                     Date createdAt, ListingDto listing) {
}
