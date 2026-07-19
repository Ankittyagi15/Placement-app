package com.placementprep.portal.controller;

import com.placementprep.portal.entity.MCQ;
import com.placementprep.portal.repository.MCQRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mcqs")
@CrossOrigin(origins = "*")
public class MCQController {

    private final MCQRepository mcqRepository;

    public MCQController(MCQRepository mcqRepository) {
        this.mcqRepository = mcqRepository;
    }

    @GetMapping
    public ResponseEntity<List<MCQ>> getAllMCQs() {
        return ResponseEntity.ok(mcqRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MCQ> getMCQById(@PathVariable Long id) {
        return mcqRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<MCQ>> getMCQsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(mcqRepository.findByCategory(category));
    }

    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<MCQ>> getMCQsByDifficulty(@PathVariable String difficulty) {
        return ResponseEntity.ok(mcqRepository.findByDifficulty(difficulty));
    }

    @GetMapping("/search")
    public ResponseEntity<List<MCQ>> searchMCQs(@RequestParam String keyword) {
        return ResponseEntity.ok(mcqRepository.findByQuestionContainingIgnoreCase(keyword));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<MCQ>> filterMCQs(@RequestParam String category, @RequestParam String difficulty) {
        return ResponseEntity.ok(mcqRepository.findByCategoryAndDifficulty(category, difficulty));
    }

    @PostMapping
    public ResponseEntity<MCQ> createMCQ(@RequestBody MCQ mcq) {
        MCQ saved = mcqRepository.save(mcq);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MCQ> updateMCQ(@PathVariable Long id, @RequestBody MCQ mcq) {
        return mcqRepository.findById(id).map(existing -> {
            mcq.setId(existing.getId());
            MCQ updated = mcqRepository.save(mcq);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMCQ(@PathVariable Long id) {
        return mcqRepository.findById(id).map(existing -> {
            mcqRepository.delete(existing);
            return ResponseEntity.noContent().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
