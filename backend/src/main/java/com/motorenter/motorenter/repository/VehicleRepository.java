package com.motorenter.motorenter.repository;

import com.motorenter.motorenter.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    List<Vehicle> findByUserId(int userId);
}
