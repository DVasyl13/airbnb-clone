package com.example.app.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "reservation")
@Getter
@Setter
@ToString(exclude = {"user", "listing"})
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date startDate;
    private Date endDate;
    private double totalPrice;
    private Date createdAt;

    public Reservation(Date startDate, Date endDate, double totalPrice, Date createdAt) {
        this.startDate = startDate;
        this.createdAt = new Date();
        this.endDate = endDate;
        this.totalPrice = totalPrice;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "listing_id")
    @JsonManagedReference
    private Listing listing;
}
