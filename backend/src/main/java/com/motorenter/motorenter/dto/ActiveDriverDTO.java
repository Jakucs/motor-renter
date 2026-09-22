package com.motorenter.motorenter.dto;

public class ActiveDriverDTO {
    private int userId;
    private String userName;
    private String firstName;
    private String lastName;
    private String profilePictureUrl;
    private String vehicleBrand;
    private String vehicleModel;
    private Double lat;
    private Double lng;

    public ActiveDriverDTO(int userId, Double lat, Double lng, String userName, String firstName, String lastName, String profilePictureUrl, String vehicleBrand, String vehicleModel) {
        this.userId = userId;
        this.lat = lat;
        this.lng = lng;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePictureUrl = profilePictureUrl;
        this.vehicleBrand = vehicleBrand;
        this.vehicleModel = vehicleModel;
    }

    public int getUserId() { return userId; }
    public Double getLat() { return lat; }
    public Double getLng() { return lng; }
    public String getUserName() { return userName; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getProfilePictureUrl() { return profilePictureUrl; }
    public String getVehicleBrand() { return vehicleBrand; }
    public String getVehicleModel() { return vehicleModel; }
}
