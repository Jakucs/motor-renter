package com.motorenter.motorenter.controller;

import com.motorenter.motorenter.dto.OrderDTO;
import com.motorenter.motorenter.model.Order;
import com.motorenter.motorenter.model.OrderStatus;
import com.motorenter.motorenter.service.OrderService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order createOrder(@RequestBody Map<String, Integer> body) {
        int passengerId = body.get("passengerId");
        int driverId = body.get("driverId");
        return orderService.createOrder(passengerId, driverId);
    }

    @GetMapping("/driver/{driverId}/pending")
    public List<Order> getPendingOrders(@PathVariable int driverId) {
        return orderService.getPendingOrdersForDriver(driverId);
    }

    @PutMapping("/{orderId}/status")
    public Order updateStatus(@PathVariable int orderId, @RequestBody Map<String, String> body) {
        OrderStatus status = OrderStatus.valueOf(body.get("status"));
        return orderService.updateOrderStatus(orderId, status);
    }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable int id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("/orders/my-active-order")
    public OrderDTO getMyActiveOrder(@AuthenticationPrincipal Integer userId) {
        return orderService.getActiveOrderForPassenger(userId); // null vagy a legutóbbi PENDING/ACCEPTED rendelés
    }
}