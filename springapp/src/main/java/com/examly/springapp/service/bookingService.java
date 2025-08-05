package com.examly.springapp.service;

import com.examly.springapp.model.booking;
import com.examly.springapp.model.bookingHistory;
import com.examly.springapp.model.parkingSlot;
import com.examly.springapp.model.user;
import com.examly.springapp.repository.bookingRepository;
import com.examly.springapp.repository.ParkingSlotRepository;
import com.examly.springapp.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class bookingService {

    @Autowired
    private bookingRepository bookingRepo;

    @Autowired
    private userRepository userRepo;

    @Autowired
    private ParkingSlotRepository slotRepo;

    @Autowired
    private bookingHistoryService bookingHistoryService;

    public booking createBooking(booking b, int userId, int parkingSlotId) {
        Optional<user> u = userRepo.findById(userId);
        Optional<parkingSlot> slotOpt = slotRepo.findById(parkingSlotId);

        if (u.isEmpty() || slotOpt.isEmpty()) return null;

        parkingSlot slot = slotOpt.get();
        if (!slot.isAvailable() || b.getStartTime().isAfter(b.getEndTime())) return null;

        long hours = Duration.between(b.getStartTime(), b.getEndTime()).toHours();
        double cost = hours * slot.getHourlyRate();

        b.setUser(u.get());
        b.setParkingSlot(slot);
        b.setTotalCost(cost);
        b.setStatus("Confirmed");

        slot.setAvailable(false);
        slotRepo.save(slot);

        booking savedBooking = bookingRepo.save(b);

        bookingHistory history = new bookingHistory();
        history.setBooking(savedBooking);
        history.setStatusChange("Created");
        history.setPreviousStatus(null);
        history.setNewStatus("Confirmed");
        history.setChangeDate(LocalDateTime.now());
        history.setChangedBy(savedBooking.getUser());
        history.setNotes("Booking successfully created");
        history.setReason("New booking created");

        bookingHistoryService.saveHistory(history);

        return savedBooking;
    }

    public booking cancelBooking(int bookingId) {
        Optional<booking> bOpt = bookingRepo.findById(bookingId);
        if (bOpt.isEmpty()) return null;

        booking b = bOpt.get();
        if ("Cancelled".equalsIgnoreCase(b.getStatus())) return null;

        b.setStatus("Cancelled");

        parkingSlot slot = b.getParkingSlot();
        slot.setAvailable(true);
        slotRepo.save(slot);

        booking savedBooking = bookingRepo.save(b);

        bookingHistory history = new bookingHistory();
        history.setBooking(savedBooking);
        history.setStatusChange("Cancelled");
        history.setPreviousStatus("Confirmed");
        history.setNewStatus("Cancelled");
        history.setChangeDate(LocalDateTime.now());
        history.setChangedBy(savedBooking.getUser());
        history.setNotes("Booking cancelled by user");
        history.setReason("User cancelled the booking");

        bookingHistoryService.saveHistory(history);

        return savedBooking;
    }

    public booking rejectBooking(int bookingId) {
        Optional<booking> bOpt = bookingRepo.findById(bookingId);
        if (bOpt.isEmpty()) return null;

        booking b = bOpt.get();
        if ("Rejected".equalsIgnoreCase(b.getStatus())) return null;

        b.setStatus("Rejected");

        parkingSlot slot = b.getParkingSlot();
        slot.setAvailable(true);
        slotRepo.save(slot);

        booking savedBooking = bookingRepo.save(b);

        bookingHistory history = new bookingHistory();
        history.setBooking(savedBooking);
        history.setStatusChange("Rejected");
        history.setPreviousStatus("Confirmed");
        history.setNewStatus("Rejected");
        history.setChangeDate(LocalDateTime.now());
        history.setChangedBy(savedBooking.getUser());
        history.setNotes("Booking rejected by admin");
        history.setReason("Policy or availability issue");

        bookingHistoryService.saveHistory(history);

        return savedBooking;
    }

    public List<booking> getBookingsByUserId(int userId) {
        return bookingRepo.findByUserId(userId);
    }

    public Optional<booking> getBookingById(int bookingId) {
        return bookingRepo.findById(bookingId);
    }

    public List<booking> getAllBookings() {
        return bookingRepo.findAll();
    }
}