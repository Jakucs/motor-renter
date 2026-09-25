package com.motorenter.motorenter.service;

import com.motorenter.motorenter.dto.OrderDTO;
import com.motorenter.motorenter.model.Order;
import com.motorenter.motorenter.model.OrderStatus;
import com.motorenter.motorenter.model.User;
import com.motorenter.motorenter.repository.OrderRepository;
import com.motorenter.motorenter.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final GeocodingService geocodingService;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, GeocodingService geocodingService) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.geocodingService = geocodingService;
    }

    public Order createOrder(int passengerId, int driverId, Double lat, Double lng) {
        User passenger = userRepository.findById(passengerId)
                .orElseThrow(() -> new RuntimeException("Passenger not found"));
        User driver = userRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        Order order = new Order(passenger, driver);
        order.setPassengerLat(lat);
        order.setPassengerLng(lng);

        if (lat != null && lng != null) {
            String address = geocodingService.getAddressFromCoordinates(lat, lng);
            order.setPassengerAddress(address);
        }
        return orderRepository.save(order);
    }

    public List<Order> getPendingOrdersForDriver(int driverId) {
        return orderRepository.findByDriverIdAndStatus(driverId, OrderStatus.PENDING);
    }

    public Order updateOrderStatus(int orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public Order getOrderById(int id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public OrderDTO getActiveOrderForPassenger(Integer passengerId) {
        Optional<Order> activeOrder = orderRepository
                .findFirstByPassengerIdAndStatusInOrderByCreatedAtDesc(
                        passengerId,
                        List.of(OrderStatus.PENDING, OrderStatus.ACCEPTED)
                );

        return activeOrder.map(OrderDTO::new).orElse(null);
    }
}
