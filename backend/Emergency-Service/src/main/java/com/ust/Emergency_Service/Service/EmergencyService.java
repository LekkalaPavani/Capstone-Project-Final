package com.ust.Emergency_Service.Service;

import com.ust.Emergency_Service.Model.Emergency;
import com.ust.Emergency_Service.Repository.EmergencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmergencyService {
    @Autowired
    private EmergencyRepository emergencyRepo;
    public Emergency saveEmergencyDetails(Emergency emergency){
        return emergencyRepo.save(emergency);
    }
    public Emergency getEmergencyDetailsById(Long emerid){
        return emergencyRepo.findById(emerid).orElse(null);
    }
    public List<Emergency> getAllEmergencyDetails(){
        return emergencyRepo.findAll();
    }
}
