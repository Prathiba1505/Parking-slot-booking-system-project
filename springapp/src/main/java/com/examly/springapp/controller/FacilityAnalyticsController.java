package com.examly.springapp.controller;

import com.examly.springapp.model.FacilityAnalytics;
import com.examly.springapp.service.FacilityAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/facility-analytics")
@CrossOrigin(origins = "*")
public class FacilityAnalyticsController 
{

    @Autowired
    private FacilityAnalyticsService analyticsService;

    @PostMapping
    public FacilityAnalytics addAnalytics(@RequestBody FacilityAnalytics analytics) 
    {
        return analyticsService.addAnalytics(analytics);
    }

    @GetMapping
    public List<FacilityAnalytics> getAllAnalytics() 
    {
        return analyticsService.getAllAnalytics();
    }

    @GetMapping("/{id}")
    public Optional<FacilityAnalytics> getAnalyticsById(@PathVariable Long id) 
    {
        return analyticsService.getAnalyticsById(id);
    }

    @PutMapping("/{id}")
    public FacilityAnalytics updateAnalytics(@PathVariable Long id, @RequestBody FacilityAnalytics analytics) 
    {
        return analyticsService.updateAnalytics(id, analytics);
    }

    @DeleteMapping("/{id}")
    public void deleteAnalytics(@PathVariable Long id) 
    {
        analyticsService.deleteAnalytics(id);
    }
}
