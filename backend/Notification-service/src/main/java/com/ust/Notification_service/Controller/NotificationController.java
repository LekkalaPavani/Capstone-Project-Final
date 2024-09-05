package com.ust.Notification_service.Controller;

import com.ust.Notification_service.Model.IncidentNotification;
import com.ust.Notification_service.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody IncidentNotification incidentNotification) {
        notificationService.sendNotification(incidentNotification);
        return ResponseEntity.ok("Notification sent");
    }


}
