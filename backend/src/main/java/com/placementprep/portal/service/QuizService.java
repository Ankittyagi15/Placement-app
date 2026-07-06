package com.placementprep.portal.service;

import com.placementprep.portal.dto.QuizResultDTO;
import com.placementprep.portal.dto.QuizSubmitRequest;
import com.placementprep.portal.entity.MCQ;
import com.placementprep.portal.entity.QuizResult;
import com.placementprep.portal.exception.ResourceNotFoundException;
import com.placementprep.portal.repository.MCQRepository;
import com.placementprep.portal.repository.QuizResultRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuizResultRepository quizResultRepository;
    private final MCQRepository mcqRepository;

    public QuizService(QuizResultRepository quizResultRepository, MCQRepository mcqRepository) {
        this.quizResultRepository = quizResultRepository;
        this.mcqRepository = mcqRepository;
    }

    public QuizResultDTO submitQuiz(QuizSubmitRequest request) {
        List<MCQ> mcqs = mcqRepository.findByCategory(request.getCategory());

        int correctCount = 0;
        for (Map.Entry<Long, String> entry : request.getAnswers().entrySet()) {
            MCQ mcq = mcqs.stream()
                    .filter(m -> m.getId().equals(entry.getKey()))
                    .findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("MCQ not found with id: " + entry.getKey()));

            if (mcq.getCorrectAnswer().equalsIgnoreCase(entry.getValue())) {
                correctCount++;
            }
        }

        int totalQuestions = request.getAnswers().size();
        int wrongAnswers = totalQuestions - correctCount;
        double score = (correctCount * 100.0) / totalQuestions;
        double percentage = score;

        QuizResult quizResult = QuizResult.builder()
                .category(request.getCategory())
                .totalQuestions(totalQuestions)
                .correctAnswers(correctCount)
                .wrongAnswers(wrongAnswers)
                .score((double) correctCount)
                .percentage(percentage)
                .attemptedAt(LocalDateTime.now())
                .build();

        QuizResult savedResult = quizResultRepository.save(quizResult);
        return convertToDTO(savedResult);
    }

    public List<QuizResultDTO> getAllResults() {
        return quizResultRepository.findAllByOrderByAttemptedAtDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public QuizResultDTO getResultById(Long id) {
        QuizResult result = quizResultRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz result not found with id: " + id));
        return convertToDTO(result);
    }

    public List<QuizResultDTO> getResultsByCategory(String category) {
        return quizResultRepository.findByCategory(category).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Map<String, Object> getOverallStats() {
        List<QuizResult> allResults = quizResultRepository.findAll();

        return Map.of(
                "totalAttempts", allResults.size(),
                "averageScore", quizResultRepository.getAverageScore() != null ? quizResultRepository.getAverageScore() : 0.0,
                "highestScore", quizResultRepository.getHighestScore() != null ? quizResultRepository.getHighestScore() : 0.0,
                "lowestScore", quizResultRepository.getLowestScore() != null ? quizResultRepository.getLowestScore() : 0.0
        );
    }

    private QuizResultDTO convertToDTO(QuizResult result) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return QuizResultDTO.builder()
                .id(result.getId())
                .category(result.getCategory())
                .totalQuestions(result.getTotalQuestions())
                .correctAnswers(result.getCorrectAnswers())
                .wrongAnswers(result.getWrongAnswers())
                .score(result.getScore())
                .percentage(result.getPercentage())
                .attemptedAt(result.getAttemptedAt() != null ? result.getAttemptedAt().format(formatter) : "")
                .build();
    }
}
