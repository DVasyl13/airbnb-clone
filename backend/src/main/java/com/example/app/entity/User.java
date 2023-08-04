package com.example.app.entity;

import com.example.app.security.token.Token;
import com.example.app.utils.UserRole;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Table(name = "user")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String password;
    @NaturalId(mutable = true)
    private String email;

    @Column(name = "image")
    private String image;
    private Date createdAt;
    private Date updatedAt;
    private Boolean isEnable;
    private Boolean isExpired;
    private Boolean isLocked;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    @JsonIgnore
    private Set<Token> tokens;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonBackReference
    @JsonIgnore
    private Set<Listing> listings;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonBackReference
    @JsonIgnore
    private Set<Reservation> reservations;

    public User(Long id) {
        this.id = id;
    }

    public User(String name,
                String password,
                String email,
                UserRole role) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.userRole = role;
        this.isLocked = false;
        this.isExpired = false;
        this.isEnable = true;
    }

    public User(Long id, String username,
                String password, String email,
                Boolean isEnable, String image,
                Date createdAt, Date updatedAt,
                Boolean isExpired, Boolean isLocked,
                UserRole userRole) {
        this.id = id;
        this.name = username;
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.image = image;
        this.isEnable = isEnable;
        this.isExpired = isExpired;
        this.isLocked = isLocked;
        this.userRole = userRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userRole.name()));
    }
    public String getName() {
        return name;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !isExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnable;
    }
}