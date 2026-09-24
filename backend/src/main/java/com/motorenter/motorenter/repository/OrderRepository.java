package com.motorenter.motorenter.repository;

import com.motorenter.motorenter.model.Order;
import com.motorenter.motorenter.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByDriverIdAndStatus(int driverId, OrderStatus status);
    List<Order> findByPassengerIdAndStatus(int passengerId, OrderStatus status);
}