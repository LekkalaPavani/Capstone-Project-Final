package com.ust.Notification_service;

import com.ust.Incident_Management_System.Model.IncidentReport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;


@SpringBootApplication
@Slf4j
public class NotificationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificationServiceApplication.class, args);
	}

//	@KafkaListener(topics = "incident-topic", groupId = "notification-group")
//	public void listen(IncidentReport incidentReport) {
//		System.out.println("Received IncidentReport: " + incidentReport);
//		}properties = {"spring.json.value.default.type=com.ust.Notification_service.IncidentReport"}
	@KafkaListener(topics = "incident-topic", groupId = "notification-group" )
	public void handleNotification(@Payload IncidentReport incident){
		log.info("Recievced notification for IncidentReport is {}", incident);
	}

}
