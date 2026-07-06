package com.placementprep.portal.controller;

import com.placementprep.portal.dto.MCQDTO;
import com.placementprep.portal.service.MCQService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mcqs")
@CrossOrigin(origins = "*")
public class MCQController {

    private final MCQService mcqService;

    public MCQController(MCQService mcqService) {
        this.mcqService = mcqService;
    }

    @GetMapping
    public ResponseEntity<List<MCQDTO>> getAllMCQs() {
        return ResponseEntity.ok(mcqService.getAllMCQs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MCQDTO> getMCQById(@PathVariable Long id) {
        return ResponseEntity.ok(mcqService.getMCQById(id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<MCQDTO>> getMCQsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(mcqService.getMCQsByCategory(category));
    }

    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<MCQDTO>> getMCQsByDifficulty(@PathVariable String difficulty) {
        return ResponseEntity.ok(mcqService.getMCQsByDifficulty(difficulty));
    }

    @GetMapping("/search")
    public ResponseEntity<List<MCQDTO>> searchMCQs(@RequestParam String keyword) {
        return ResponseEntity.ok(mcqService.searchMCQs(keyword));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<MCQDTO>> filterMCQs(
            @RequestParam String category,
            @RequestParam String difficulty) {
        return ResponseEntity.ok(mcqService.filterMCQs(category, difficulty));
    }

    @PostMapping
    public ResponseEntity<MCQDTO> createMCQ(@Valid @RequestBody MCQDTO mcqDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(mcqService.createMCQ(mcqDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MCQDTO> updateMCQ(@PathVariable Long id, @Valid @RequestBody MCQDTO mcqDTO) {
        return ResponseEntity.ok(mcqService.updateMCQ(id, mcqDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMCQ(@PathVariable Long id) {
        mcqService.deleteMCQ(id);
        return ResponseEntity.noContent().build();
    }
}
