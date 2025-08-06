package com.examly.springapp.service;

import com.examly.springapp.model.user;
import com.examly.springapp.model.Vehicle;
import com.examly.springapp.repository.userRepository;
import com.examly.springapp.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private userRepository userRepository;

    public Vehicle addVehicle(Vehicle vehicle) {
        int userId = vehicle.getUser().getUserId();
        user userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        vehicle.setUser(userEntity);
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    public List<Vehicle> getVehiclesByUserId(int userId) {
        return vehicleRepository.findByUserId(userId);
    }

    public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {
        return vehicleRepository.findById(id).map(vehicle -> {
            vehicle.setLicensePlate(updatedVehicle.getLicensePlate());
            vehicle.setVehicleType(updatedVehicle.getVehicleType());
            vehicle.setMake(updatedVehicle.getMake());
            vehicle.setModel(updatedVehicle.getModel());
            vehicle.setColor(updatedVehicle.getColor());
            vehicle.setYear(updatedVehicle.getYear());
            vehicle.setIsDefault(updatedVehicle.getIsDefault());

            if (updatedVehicle.getUser() != null) {
                int userId = updatedVehicle.getUser().getUserId();
                user userEntity = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));
                vehicle.setUser(userEntity);
            }

            return vehicleRepository.save(vehicle);
        }).orElse(null);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}
