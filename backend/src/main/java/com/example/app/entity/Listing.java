package com.example.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "listing")
@Getter @Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double price;
    private String title;
    private String description;
    private String category;
    private int roomCount;
    private Date createdAt;
    private int guestCount;
    private int bathroomCount;
    private String image;
    public Listing(double price,
                   String title,
                   String description,
                   String category,
                   int roomCount,
                   int guestCount,
                   int bathroomCount,
                   String image) {
        this.price = price;
        this.description = description;
        this.title = title;
        this.category = category;
        this.roomCount = roomCount;
        this.guestCount = guestCount;
        this.bathroomCount = bathroomCount;
        this.image = image;
        this.createdAt = new Date();
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    @OneToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @OneToMany(mappedBy = "listing")
    @JsonBackReference
    @JsonIgnore
    private Set<Reservation> reservations;
}
