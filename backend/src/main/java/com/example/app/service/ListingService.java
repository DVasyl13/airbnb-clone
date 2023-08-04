package com.example.app.service;

import com.example.app.controller.dto.ListingDto;
import com.example.app.entity.Listing;
import com.example.app.entity.Location;
import com.example.app.entity.User;
import com.example.app.repository.ListingRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ListingService {
    private final ListingRepository listingRepository;
    private final UserService userService;

    @Transactional
    public ListingDto saveListing(ListingDto requestBody, HttpServletRequest request) {
        User user = userService.getUserFromJwt(request);
        Listing listing = new Listing(
                requestBody.price(), requestBody.title(),
                requestBody.description(),
                requestBody.category(), requestBody.roomCount(),
                requestBody.guestCount(), requestBody.bathroomCount(),
                requestBody.image()
        );
        var locationDto = requestBody.location();
        Location location = new Location(
            requestBody.location().flag(),
                locationDto.label(),
                locationDto.latlng(),
                locationDto.region(),
                locationDto.value()
        );
        listing.setUser(user);
        listing.setLocation(location);
        listingRepository.save(listing);
        return requestBody;
    }
}
