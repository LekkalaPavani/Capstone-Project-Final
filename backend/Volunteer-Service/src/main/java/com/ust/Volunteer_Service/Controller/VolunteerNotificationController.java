package com.ust.Volunteer_Service.Controller;

import com.ust.Volunteer_Service.Dto.VolunteerNotificationResponse;
import com.ust.Volunteer_Service.Service.VolunteerNotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class VolunteerNotificationController {

    @Autowired
    private VolunteerNotificationService notificationService;

    @GetMapping("/{volunteerId}")
    public ResponseEntity<List<VolunteerNotificationResponse>> getNotificationsForVolunteer(@PathVariable Long volunteerId) {
        List<VolunteerNotificationResponse> notifications = notificationService.getNotificationsForVolunteer(volunteerId);
        return ResponseEntity.ok(notifications);
    }
}

