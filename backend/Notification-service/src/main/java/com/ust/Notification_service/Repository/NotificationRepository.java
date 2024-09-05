package com.ust.Notification_service.Repository;

import com.ust.Notification_service.Model.IncidentNotification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<IncidentNotification,Long> {
}
