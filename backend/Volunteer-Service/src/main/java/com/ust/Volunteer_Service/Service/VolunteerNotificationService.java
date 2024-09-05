package com.ust.Volunteer_Service.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import com.ust.Incident_Management_System.Model.IncidentReport;
import com.ust.Volunteer_Service.Dto.VolunteerNotificationResponse;
import com.ust.Volunteer_Service.Model.Volunteer;
import com.ust.Volunteer_Service.Model.VolunteerNotification;
import com.ust.Volunteer_Service.Repository.VolunteerNotificationRepository;
import com.ust.Volunteer_Service.Repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VolunteerNotificationService {
    private  String accountSid="ACc72d51195e64f7b301dbcadbfc873cb6";


    private String authToken = "216dd7b4a778a499dfcb2e1c072e0664";


    private String fromPhoneNumber = "+14123576884";

    public VolunteerNotificationService() {
        Twilio.init(accountSid, authToken);
    }

    @Autowired
    private VolunteerNotificationRepository notificationRepository;

    @Autowired
    private VolunteerRepository volunteerRepository;

//    public List<VolunteerNotificationResponse> getNotificationsForVolunteer(Long volunteerId) {
//        Volunteer volunteer = volunteerRepository.findById(volunteerId)
//                .orElseThrow(() -> new RuntimeException("Volunteer not found"));
//
//        String volunteerCity = volunteer.getVolunteerCity();
//
//        // Fetch notifications for this volunteer
//        List<VolunteerNotification> notifications = notificationRepository.findByVolunteer_VolunteerId(volunteerId);
//
//    }

    public void addNotificationtoVolunteer(IncidentReport incident) {
        String city = incident.getCity();
        List<Volunteer> volunteersInCity = volunteerRepository.findByVolunteerCity(city);

        for (Volunteer volunteer : volunteersInCity) {
            VolunteerNotification notification = new VolunteerNotification();
            notification.setMessage(createNotificationMessage(incident));
            notification.setVolunteer(volunteer);
            notification.setCreatedAt(LocalDateTime.now());
            // If you have an IncidentReport DTO or related information, set it if necessary
            notification.setIncidentReport(incident);

            // Save the notification to the database
            notificationRepository.save(notification);
            sendSms(volunteer.getPhoneNumber(), "IncidentReported at " + incident.getMapLink() + "Please find more details in our application");

        }

    }

    private String createNotificationMessage(IncidentReport incident) {
        // Customize the message format as needed
        return String.format("Incident Reported: %s. at Location: %s. Description: %s. City: %s. Please find the map link below:%s.",
                incident.getTypeOfIncident(), incident.getLocation(), incident.getDescription(), incident.getCity(),  incident.getMapLink());
    }

    public List<VolunteerNotificationResponse> getNotificationsForVolunteer(Long volunteerId) {
        List<VolunteerNotification> notifications =  notificationRepository.findByVolunteer_VolunteerId(volunteerId);

        // Convert List<VolunteerNotification> to List<VolunteerNotificationResponse>
        return notifications.stream()
                .map(notification -> {
                    VolunteerNotificationResponse response = new VolunteerNotificationResponse();
                    response.setMessage(notification.getMessage());
                    if (notification.getIncidentReport() != null) {
                        response.setMapLink(notification.getIncidentReport().getMapLink());
                    } else {
                        response.setMapLink(null);
                    }
                    return response;
                })
                .collect(Collectors.toList());
    }

    public void sendSms(String toPhoneNumber, String message) {
        Message.creator(new PhoneNumber(toPhoneNumber), new PhoneNumber(fromPhoneNumber), message).create();
    }
}

