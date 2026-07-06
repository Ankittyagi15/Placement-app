package com.placementprep.portal.controller;

import com.placementprep.portal.dto.QuizResultDTO;
import com.placementprep.portal.dto.QuizSubmitRequest;
import com.placementprep.portal.service.QuizService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/submit")
    public ResponseEntity<QuizResultDTO> submitQuiz(@Valid @RequestBody QuizSubmitRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(quizService.submitQuiz(request));
    }

    @GetMapping("/results")
    public ResponseEntity<List<QuizResultDTO>> getAllResults() {
        return ResponseEntity.ok(quizService.getAllResults());
    }

    @GetMapping("/results/{id}")
    public ResponseEntity<QuizResultDTO> getResultById(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getResultById(id));
    }

    @GetMapping("/results/category/{category}")
    public ResponseEntity<List<QuizResultDTO>> getResultsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(quizService.getResultsByCategory(category));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getOverallStats() {
        return ResponseEntity.ok(quizService.getOverallStats());
    }
}
