//package com.ust.Notification_service.Model;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name="Notification")
//
//public class Notification {
//    @Id
//    private Long NotiId;
//    private String recipientEmail;
//    private String message;
//    private String type; // e.g., Alert, Update
//    private LocalDateTime sentAt;
//    private Long contactNumber;
//    private String status = "Sent";
//    private LocalDateTime createdAt = LocalDateTime.now();
//}
