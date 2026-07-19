package com.placementprep.backendmin.repository;

import com.placementprep.backendmin.entity.MCQ;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MCQRepository extends JpaRepository<MCQ, Long> {
    List<MCQ> findByCategory(String category);
    List<MCQ> findByDifficulty(String difficulty);
    List<MCQ> findByQuestionContainingIgnoreCase(String keyword);
    List<MCQ> findByCategoryAndDifficulty(String category, String difficulty);
}
