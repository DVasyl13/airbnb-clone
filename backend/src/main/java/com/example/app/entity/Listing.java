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
@ToString(exclude = {"user", "users", "location", "reservations"})
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
    private String imageSrc;
    public Listing(double price,
                   String title,
                   String description,
                   String category,
                   int roomCount,
                   int guestCount,
                   int bathroomCount,
                   String imageSrc) {
        this.price = price;
        this.description = description;
        this.title = title;
        this.category = category;
        this.roomCount = roomCount;
        this.guestCount = guestCount;
        this.bathroomCount = bathroomCount;
        this.imageSrc = imageSrc;
        this.createdAt = new Date();
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    @ManyToMany(mappedBy = "favourites", cascade = CascadeType.ALL)
    @JsonBackReference
    private Set<User> users;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL)
    @JsonBackReference
    @JsonIgnore
    private Set<Reservation> reservations;
}
