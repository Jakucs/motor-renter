package com.motorenter.motorenter.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GeocodingService {

    @Value("${google.maps.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getAddressFromCoordinates(double lat, double lng) {
        String url = String.format(
                "https://maps.googleapis.com/maps/api/geocode/json?latlng=%f,%f&key=%s",
                lat, lng, apiKey
        );

        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
            if (results != null && !results.isEmpty()) {
                return (String) results.get(0).get("formatted_address");
            }
        } catch (Exception e) {
            System.err.println("Geocoding hiba: " + e.getMessage());
        }

        return null;
    }
}