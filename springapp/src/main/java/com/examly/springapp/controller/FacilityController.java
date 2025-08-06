package com.examly.springapp.controller;

import com.examly.springapp.model.Facility;
import com.examly.springapp.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/facilities")
@CrossOrigin(origins = "*")
public class FacilityController 
{
    @Autowired
    private FacilityService facilityService;

    @PostMapping
    public Facility createFacility(@RequestBody Facility facility) 
    {
        return facilityService.addFacility(facility);
    }

    @GetMapping
    public List<Facility> getAllFacilities() 
    {
        return facilityService.getAllFacilities();
    }

    @GetMapping("/{id}")
    public Optional<Facility> getFacilityById(@PathVariable Long id) 
    {
        return facilityService.getFacilityById(id);
    }

    @PutMapping("/{id}")
    public Facility updateFacility(@PathVariable Long id, @RequestBody Facility facility) 
    {
        return facilityService.updateFacility(id, facility);
    }

    @DeleteMapping("/{id}")
    public void deleteFacility(@PathVariable Long id) 
    {
        facilityService.deleteFacility(id);
    }
}
