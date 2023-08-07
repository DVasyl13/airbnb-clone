package com.example.app.service;

import com.example.app.controller.dto.ListingDto;
import com.example.app.entity.Listing;
import com.example.app.entity.Location;
import com.example.app.entity.User;
import com.example.app.repository.ListingRepository;
import com.example.app.repository.LocationRepository;
import com.example.app.utils.Mapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListingService {
    private final ListingRepository listingRepository;
    private final LocationRepository locationRepository;
    private final UserService userService;

    @Transactional
    public ListingDto saveListing(ListingDto requestBody, HttpServletRequest request) {
        User user = userService.getUserFromJwt(request);
        Listing listing = new Listing(
                requestBody.price(), requestBody.title(),
                requestBody.description(),
                requestBody.category(), requestBody.roomCount(),
                requestBody.guestCount(), requestBody.bathroomCount(),
                requestBody.imageSrc()
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
        locationRepository.save(location);
        listing.setLocation(location);
        listingRepository.save(listing);
        return requestBody;
    }

    @Transactional
    public List<ListingDto> getAllListings() {
        var listings = listingRepository.findAll();
        return listings.stream().map(l -> new ListingDto( l.getId(),
                l.getPrice(), l.getTitle(),
                l.getDescription(), Mapper.mapLocation(l.getLocation()),
                l.getCategory(), l.getRoomCount(),
                l.getGuestCount(), l.getBathroomCount(),
                l.getImageSrc()
        )).collect(Collectors.toList());
    }

    @Transactional
    public Long addToFavourite(Long id, HttpServletRequest request) {
        User user = userService.getUserFromJwt(request);
        Listing listing = listingRepository.findById(id).orElseThrow();
        user.getFavourites().add(listing);
        return listing.getId();
    }

    @Transactional
    public Long deleteFromFavourite(Long id, HttpServletRequest request) {
        User user = userService.getUserFromJwt(request);
        Listing listing = listingRepository.findById(id).orElseThrow();
        user.getFavourites().remove(listing);
        return listing.getId();
    }
}
