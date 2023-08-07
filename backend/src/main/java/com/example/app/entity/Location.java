package com.example.app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Arrays;
import java.util.stream.Collectors;

@Entity
@Table(name = "location")
@Getter
@Setter
@ToString(exclude = "location")
@NoArgsConstructor
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String flag;
    private String label;
    private String latlng;
    private String region;
    private String value;

    public Location(String flag,
                    String label,
                    int[] latlng,
                    String region,
                    String value) {
        this.flag = flag;
        this.label = label;
        this.region = region;
        this.value = value;
        this.latlng = Arrays.stream(latlng)
                .mapToObj(String::valueOf)
                .collect(Collectors.joining(","));
    }

    @OneToOne(mappedBy = "location")
    private Listing location;
}
