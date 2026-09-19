package com.motorenter.motorenter.controller;

import com.motorenter.motorenter.model.Vehicle;
import com.motorenter.motorenter.service.VehicleService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/vehicle")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public List<Vehicle> getVehicles(@AuthenticationPrincipal Integer userId) {
        return vehicleService.getVehiclesByUserId(userId);
    }

    @PostMapping
    public Vehicle addVehicle(@AuthenticationPrincipal Integer userId, @RequestBody Vehicle vehicle) {
        return vehicleService.addVehicle(userId, vehicle);
    }

    @PutMapping("/{vehicleId}")
    public Vehicle updateVehicle(@AuthenticationPrincipal Integer userId, @PathVariable int vehicleId, @RequestBody Vehicle updatedVehicle) {
        return vehicleService.updateVehicle(userId, vehicleId, updatedVehicle);
    }

    @DeleteMapping("/{vehicleId}")
    public void deleteVehicle(@AuthenticationPrincipal Integer userId, @PathVariable int vehicleId) {
        vehicleService.deleteVehicle(userId, vehicleId);
    }

    @GetMapping("/single/{id}")
    public Vehicle getVehicle(@AuthenticationPrincipal Integer userId, @PathVariable int id) {
        return vehicleService.getVehicleById(userId, id);
    }

    @PostMapping("/{id}/upload-picture")
    public Vehicle uploadPicture(@AuthenticationPrincipal Integer userId, @PathVariable int id, @RequestParam("file") MultipartFile file) throws IOException {
        return vehicleService.uploadPicture(userId, id, file);
    }
}
