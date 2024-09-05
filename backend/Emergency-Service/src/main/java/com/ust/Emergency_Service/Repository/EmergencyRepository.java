package com.ust.Emergency_Service.Repository;

import com.ust.Emergency_Service.Model.Emergency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmergencyRepository extends JpaRepository<Emergency,Long> {
}
