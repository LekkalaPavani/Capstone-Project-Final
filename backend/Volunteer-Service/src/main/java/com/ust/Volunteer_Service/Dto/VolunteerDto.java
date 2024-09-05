package com.ust.Volunteer_Service.Dto;

import com.ust.Volunteer_Service.Model.VolunteerAvailability;
import com.ust.Volunteer_Service.Model.VolunteerNotification;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerDto {
    private String contactName;
    private String address;
    private String state;
    private String volunteerCity;
    private Long age;
    private String gender;

    private String phoneNumber;
    private String email;

    private String skills;
//    private String photoPath;
//    private String password;

    private VolunteerAvailability availabilityStatus = VolunteerAvailability.AVAILABLE ;
    private LocalDateTime registeredAt = LocalDateTime.now();

   private VolunteerNotification notifications;

}
