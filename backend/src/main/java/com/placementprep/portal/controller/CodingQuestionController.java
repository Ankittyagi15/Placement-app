package com.placementprep.portal.controller;

import com.placementprep.portal.dto.CodingQuestionDTO;
import com.placementprep.portal.service.CodingQuestionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/coding")
@CrossOrigin(origins = "*")
public class CodingQuestionController {

    private final CodingQuestionService codingQuestionService;

    public CodingQuestionController(CodingQuestionService codingQuestionService) {
        this.codingQuestionService = codingQuestionService;
    }

    @GetMapping
    public ResponseEntity<List<CodingQuestionDTO>> getAllCodingQuestions() {
        return ResponseEntity.ok(codingQuestionService.getAllCodingQuestions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CodingQuestionDTO> getCodingQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(codingQuestionService.getCodingQuestionById(id));
    }

    @GetMapping("/topic/{topic}")
    public ResponseEntity<List<CodingQuestionDTO>> getCodingQuestionsByTopic(@PathVariable String topic) {
        return ResponseEntity.ok(codingQuestionService.getCodingQuestionsByTopic(topic));
    }

    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<CodingQuestionDTO>> getCodingQuestionsByDifficulty(@PathVariable String difficulty) {
        return ResponseEntity.ok(codingQuestionService.getCodingQuestionsByDifficulty(difficulty));
    }

    @GetMapping("/search")
    public ResponseEntity<List<CodingQuestionDTO>> searchCodingQuestions(@RequestParam String keyword) {
        return ResponseEntity.ok(codingQuestionService.searchCodingQuestions(keyword));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<CodingQuestionDTO>> filterCodingQuestions(
            @RequestParam String topic,
            @RequestParam String difficulty) {
        return ResponseEntity.ok(codingQuestionService.filterCodingQuestions(topic, difficulty));
    }

    @PostMapping
    public ResponseEntity<CodingQuestionDTO> createCodingQuestion(@Valid @RequestBody CodingQuestionDTO codingQuestionDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(codingQuestionService.createCodingQuestion(codingQuestionDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CodingQuestionDTO> updateCodingQuestion(
            @PathVariable Long id,
            @Valid @RequestBody CodingQuestionDTO codingQuestionDTO) {
        return ResponseEntity.ok(codingQuestionService.updateCodingQuestion(id, codingQuestionDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCodingQuestion(@PathVariable Long id) {
        codingQuestionService.deleteCodingQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
