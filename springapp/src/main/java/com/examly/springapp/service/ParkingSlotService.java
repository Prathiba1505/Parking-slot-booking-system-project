package com.examly.springapp.service;

import com.examly.springapp.model.parkingSlot;
import com.examly.springapp.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ParkingSlotService {

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    public Page<parkingSlot> getAllSlots(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return parkingSlotRepository.findAll(pageable);
    }

    public Optional<parkingSlot> getSlotById(int id) {
        return parkingSlotRepository.findById(id);
    }

    public parkingSlot saveSlot(parkingSlot slot) {
        if (parkingSlotRepository.existsBySlotNumber(slot.getSlotNumber())) {
            return null;
        }
        return parkingSlotRepository.save(slot);
    }

    public parkingSlot updateSlot(int id, parkingSlot slot) {
        Optional<parkingSlot> existingSlot = parkingSlotRepository.findById(id);
        if (existingSlot.isPresent()) {
            parkingSlot updated = existingSlot.get();
            updated.setSlotType(slot.getSlotType());
            updated.setAvailable(slot.isAvailable());
            updated.setHourlyRate(slot.getHourlyRate());
            updated.setLocation(slot.getLocation());
            updated.setFloor(slot.getFloor());
            updated.setSection(slot.getSection());
            updated.setCoordinates(slot.getCoordinates());
            updated.setFeatures(slot.getFeatures());
            return parkingSlotRepository.save(updated);
        }
        return null;
    }

    public List<parkingSlot> findByAvailability(boolean available) {
        return parkingSlotRepository.findByIsAvailable(available);
    }

    public void deleteSlot(int id) {
        parkingSlotRepository.deleteById(id);
    }
}
