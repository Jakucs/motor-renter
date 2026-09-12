package com.motorenter.motorenter.controller;

import com.motorenter.motorenter.model.Vehicle;
import com.motorenter.motorenter.service.VehicleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/vehicle")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping("/{userId}")
    public List<Vehicle> getVehicles(@PathVariable int userId) {
        return vehicleService.getVehiclesByUserId(userId);
    }

    @PostMapping("/{userId}")
    public Vehicle addVehicle(@PathVariable int userId, @RequestBody Vehicle vehicle) {
        return vehicleService.addVehicle(userId, vehicle);
    }

    @PutMapping("/{vehicleId}")
    public Vehicle updateVehicle(@PathVariable int vehicleId, @RequestBody Vehicle updatedVehicle) {
        return vehicleService.updateVehicle(vehicleId, updatedVehicle);
    }

    @DeleteMapping("/{vehicleId}")
    public void deleteVehicle(@PathVariable int vehicleId) {
        vehicleService.deleteVehicle(vehicleId);
    }

    @GetMapping("/single/{id}")
    public Vehicle getVehicle(@PathVariable int id) {
        return vehicleService.getVehicleById(id);
    }
}
