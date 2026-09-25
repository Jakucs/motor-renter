package com.motorenter.motorenter.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "passenger_id")
    private User passenger;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private Double passengerLat;
    private Double passengerLng;

    private String passengerAddress;

    private LocalDateTime createdAt;

    public Order() {}

    public Order(User passenger, User driver) {
        this.passenger = passenger;
        this.driver = driver;
        this.status = OrderStatus.PENDING;
        this.createdAt = LocalDateTime.now();
    }

    public int getId() { return id; }
    public User getPassenger() { return passenger; }
    public User getDriver() { return driver; }
    public OrderStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setPassenger(User passenger) { this.passenger = passenger; }
    public void setDriver(User driver) { this.driver = driver; }
    public void setStatus(OrderStatus status) { this.status = status; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Double getPassengerLat() { return passengerLat; }
    public void setPassengerLat(Double passengerLat) { this.passengerLat = passengerLat; }

    public Double getPassengerLng() { return passengerLng; }
    public void setPassengerLng(Double passengerLng) { this.passengerLng = passengerLng; }

    public String getPassengerAddress() { return passengerAddress; }
    public void setPassengerAddress(String passengerAddress) { this.passengerAddress = passengerAddress; }


}
