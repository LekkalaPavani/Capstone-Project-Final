package com.ust.Volunteer_Service.Dto;

import com.ust.Volunteer_Service.Model.VolunteerAvailability;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerResponse {
    private String contactName;
    private String address;
    private Long age;
    private String gender;

    private String volunteerCity;

    private String phoneNumber;
    private String email;
    private String skills;
//    private String photoPath;


    private VolunteerAvailability availabilityStatus ;
}
