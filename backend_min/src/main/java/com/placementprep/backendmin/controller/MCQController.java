package com.placementprep.backendmin.controller;

import com.placementprep.backendmin.entity.MCQ;
import com.placementprep.backendmin.repository.MCQRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mcqs")
@CrossOrigin(origins = "*")
public class MCQController {

    private final MCQRepository mcqRepository;

    public MCQController(MCQRepository mcqRepository) { this.mcqRepository = mcqRepository; }

    @GetMapping
    public ResponseEntity<List<MCQ>> getAll() { return ResponseEntity.ok(mcqRepository.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<MCQ> getById(@PathVariable Long id) {
        return mcqRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

}
