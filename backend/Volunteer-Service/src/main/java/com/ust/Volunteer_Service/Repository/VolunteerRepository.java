package com.ust.Volunteer_Service.Repository;

import com.ust.Volunteer_Service.Model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VolunteerRepository extends JpaRepository<Volunteer,Long> {
    //List<Volunteer> findByLatitudeAndLongitude(String latitude, String longitude);
    List<Volunteer> findByVolunteerCity(String volunteerCity);
    Volunteer findByEmail(String email);
}
