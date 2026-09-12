package com.motorenter.motorenter.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name="vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String brand;
    private String model;
    private int year;
    private int engineSize;
    private String pictureUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Vehicle() {}

    public Vehicle(String brand, String model, int year, int engineSize, User user) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.engineSize = engineSize;
        this.user = user;
    }

    public int getId() { return id; }
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public int getYear() { return year; }
    public int getEngineSize() { return engineSize; }
    public String getPictureUrl() { return pictureUrl; }
    public User getUser() { return user; }

    public void setBrand(String brand) { this.brand = brand; }
    public void setModel(String model) { this.model = model; }
    public void setYear(int year) { this.year = year; }
    public void setEngineSize(int engineSize) { this.engineSize = engineSize; }
    public void setPictureUrl(String pictureUrl) { this.pictureUrl = pictureUrl; }
    public void setUser(User user) { this.user = user; }
}
