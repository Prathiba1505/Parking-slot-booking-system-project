package com.examly.springapp.controller;

import com.examly.springapp.model.Vehicle;
import com.examly.springapp.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController 
{

    @Autowired
    private VehicleService vehicleService;

    @PostMapping
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) 
    {
        return vehicleService.addVehicle(vehicle);
    }

    @GetMapping
    public List<Vehicle> getAllVehicles() 
    {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/{id}")
    public Optional<Vehicle> getVehicleById(@PathVariable Long id) 
    {
        return vehicleService.getVehicleById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Vehicle> getVehiclesByUserId(@PathVariable int userId) 
    {
        return vehicleService.getVehiclesByUserId(userId);
    }

    @PutMapping("/{id}")
    public Vehicle updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) 
    {
        return vehicleService.updateVehicle(id, vehicle);
    }

    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable Long id) 
    {
        vehicleService.deleteVehicle(id);
    }
}
