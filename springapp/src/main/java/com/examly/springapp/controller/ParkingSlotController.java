package com.examly.springapp.controller;

import com.examly.springapp.model.parkingSlot;
import com.examly.springapp.service.ParkingSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/slots")
public class ParkingSlotController {

    @Autowired
    private ParkingSlotService slotService;

    @GetMapping
    public Page<parkingSlot> getAllSlots(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size,
                                         @RequestParam(defaultValue = "slotId") String sortBy,
                                         @RequestParam(defaultValue = "asc") String direction) {
        return slotService.getAllSlots(page, size, sortBy, direction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSlotById(@PathVariable int id) {
        Optional<parkingSlot> slot = slotService.getSlotById(id);
        return slot.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createSlot(@RequestBody parkingSlot slot) {
        parkingSlot saved = slotService.saveSlot(slot);
        if (saved == null) {
            return ResponseEntity.badRequest().body("Slot with this number already exists.");
        }
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSlot(@PathVariable int id, @RequestBody parkingSlot slot) {
        parkingSlot updated = slotService.updateSlot(id, slot);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSlot(@PathVariable int id) {
        slotService.deleteSlot(id);
        return ResponseEntity.ok("Slot deleted successfully.");
    }

    @GetMapping("/available")
    public List<parkingSlot> getAvailableSlots(@RequestParam boolean available) {
        return slotService.findByAvailability(available);
    }
}