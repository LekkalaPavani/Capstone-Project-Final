package com.ust.Volunteer_Service.Repository;

import com.ust.Volunteer_Service.Model.VolunteerNotification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VolunteerNotificationRepository extends JpaRepository<VolunteerNotification,Long> {
    List<VolunteerNotification> findByVolunteer_VolunteerId(Long volunteerId);
}
