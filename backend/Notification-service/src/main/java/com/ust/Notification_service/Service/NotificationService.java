package com.ust.Notification_service.Service;


import com.ust.Notification_service.Model.IncidentNotification;
import com.ust.Notification_service.Repository.NotificationRepository;
import org.apache.kafka.common.protocol.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;
//
//    @Value("${twilio.account-sid}")
//    private String accountSid;
//
//    @Value("${twilio.auth-token}")
//    private String authToken;
//
//    @Value("${twilio.phone-number}")
//    private String twilioPhoneNumber;
//
//    public NotificationService(@Value("${twilio.account-sid}") String accountSid,
//                               @Value("${twilio.auth-token}") String authToken) {
//        Twilio.init(accountSid, authToken);
//    }
//
//    @KafkaListener(topics = "incident_topic", groupId = "notification-service-group")
//    public void listenToIncidentTopic(Incident_Notification notification) {
//        // Save the notification
//        notificationRepository.save(notification);
//
//        // Send the SMS
//        sendSms(notification);
//    }
//
//    private void sendSms(Incident_Notification notification) {
//        Message message = Message.creator(
//                new PhoneNumber(notification.getRecipientPhoneNumber()), // To
//                new PhoneNumber(twilioPhoneNumber), // From
//                notification.getMessage() // Message
//        ).create();
//
//        // Optionally log the response or handle exceptions
//        System.out.println("SMS sent with SID: " + message.getSid());
//    }

    @Autowired
    private KafkaTemplate<String, IncidentNotification> kafkaTemplate;


    private static final String TOPIC = "notifications";

    public void sendNotification(IncidentNotification incidentNotification) {
        // Produce notification to Kafka topic
        kafkaTemplate.send(TOPIC, incidentNotification);

        // Call external services to notify emergency services and volunteers
        // This is just a placeholder for actual implementation

    }
}