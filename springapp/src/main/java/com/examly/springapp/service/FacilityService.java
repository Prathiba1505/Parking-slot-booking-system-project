package com.examly.springapp.service;

import com.examly.springapp.model.Facility;
import com.examly.springapp.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacilityService {

    @Autowired
    private FacilityRepository facilityRepository;

    public Facility addFacility(Facility facility) {
        return facilityRepository.save(facility);
    }

    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    public Optional<Facility> getFacilityById(Long id) {
        return facilityRepository.findById(id);
    }

    public Facility updateFacility(Long id, Facility updatedFacility) {
        return facilityRepository.findById(id).map(facility -> {
            facility.setFacilityName(updatedFacility.getFacilityName());
            facility.setAddress(updatedFacility.getAddress());
            facility.setCity(updatedFacility.getCity());
            facility.setState(updatedFacility.getState());
            facility.setZipCode(updatedFacility.getZipCode());
            facility.setTotalSlots(updatedFacility.getTotalSlots());
            facility.setOperatingHours(updatedFacility.getOperatingHours());
            facility.setContactInfo(updatedFacility.getContactInfo());
            facility.setManagerId(updatedFacility.getManagerId());
            facility.setLatitude(updatedFacility.getLatitude());
            return facilityRepository.save(facility);
        }).orElse(null);
    }

    public void deleteFacility(Long id) {
        facilityRepository.deleteById(id);
    }
}
