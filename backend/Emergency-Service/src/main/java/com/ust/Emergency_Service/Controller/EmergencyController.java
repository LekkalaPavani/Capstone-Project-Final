package com.ust.Emergency_Service.Controller;

import com.ust.Emergency_Service.Model.Emergency;
import com.ust.Emergency_Service.Service.EmergencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency")
public class EmergencyController {
    @Autowired
    private EmergencyService emergencyService;
    @PostMapping("/addemergencydetails")
    public ResponseEntity<Emergency> addEmergency(@RequestBody Emergency emergency){
        return ResponseEntity.ok(emergencyService.saveEmergencyDetails(emergency));
    }
    @GetMapping("/getdetailsbyid/{id}")
    public ResponseEntity<Emergency> getDetailsById(@PathVariable Long emerid){
        return ResponseEntity.ok(emergencyService.getEmergencyDetailsById(emerid));
    }
    @GetMapping("/getalldetails")
    public ResponseEntity<List<Emergency>> getAllDetails(){
        return ResponseEntity.ok(emergencyService.getAllEmergencyDetails());
    }
}
