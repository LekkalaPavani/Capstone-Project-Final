package com.ust.Volunteer_Service.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerNotificationResponse {


    private String message;
    private String mapLink;
    private LocalDateTime createdAt = LocalDateTime.now();


}
