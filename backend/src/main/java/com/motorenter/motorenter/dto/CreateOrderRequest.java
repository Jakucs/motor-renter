package com.motorenter.motorenter.dto;

public class CreateOrderRequest {
    private int driverId;
    private Double lat;
    private Double lng;

    public int getDriverId() { return driverId; }
    public void setDriverId(int driverId) { this.driverId = driverId; }

    public Double getLat() { return lat; }
    public void setLat(Double lat) { this.lat = lat; }

    public Double getLng() { return lng; }
    public void setLng(Double lng) { this.lng = lng; }
}
