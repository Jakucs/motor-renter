package com.motorenter.motorenter.dto;


import com.motorenter.motorenter.model.Order;
import com.motorenter.motorenter.model.User;

import java.time.LocalDateTime;

public class OrderDTO {
    private int id;
    private String status;
    private LocalDateTime createdAt;
    private User passenger;
    private User driver;

    public OrderDTO(Order order) {
        this.id = order.getId();
        this.status = order.getStatus().name();
        this.createdAt = order.getCreatedAt();
        this.passenger = order.getPassenger();
        this.driver = order.getDriver();
    }

    public int getId() { return id; }
    public String getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public User getPassenger() { return passenger; }
    public User getDriver() { return driver; }
}
