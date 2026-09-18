package com.motorenter.motorenter.dto;

public class ActiveDriverDTO {
    private int userId;
    private Double lat;
    private Double lng;

    public ActiveDriverDTO(int userId, Double lat, Double lng) {
        this.userId = userId;
        this.lat = lat;
        this.lng = lng;
    }

    public int getUserId() { return userId; }
    public Double getLat() { return lat; }
    public Double getLng() { return lng; }
}
