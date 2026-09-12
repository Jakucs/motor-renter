package com.motorenter.motorenter.service;

import com.motorenter.motorenter.model.User;
import com.motorenter.motorenter.model.Vehicle;
import com.motorenter.motorenter.repository.UserRepository;
import com.motorenter.motorenter.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    public VehicleService(VehicleRepository vehicleRepository, UserRepository userRepository) {
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
    }

    public List<Vehicle> getVehiclesByUserId(int userId) {
        return vehicleRepository.findByUserId(userId);
    }

    public Vehicle addVehicle(int userId, Vehicle vehicle) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        vehicle.setUser(user);
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(int vehicleId, Vehicle updatedVehicle) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        vehicle.setBrand(updatedVehicle.getBrand());
        vehicle.setModel(updatedVehicle.getModel());
        vehicle.setYear(updatedVehicle.getYear());
        vehicle.setEngineSize(updatedVehicle.getEngineSize());
        return vehicleRepository.save(vehicle);
    }

    public Vehicle getVehicleById(int id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }

    public void deleteVehicle(int vehicleId) {
        vehicleRepository.deleteById(vehicleId);
    }

    public Vehicle uploadPicture(int id, MultipartFile file) throws IOException {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        String fileName = "vehicle_" + id + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get("uploads/vehicle-pictures/");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        vehicle.setPictureUrl("/uploads/vehicle-pictures/" + fileName);
        return vehicleRepository.save(vehicle);
    }
}
