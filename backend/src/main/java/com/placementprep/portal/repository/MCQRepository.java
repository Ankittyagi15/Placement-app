package com.placementprep.portal.repository;

import com.placementprep.portal.entity.MCQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MCQRepository extends JpaRepository<MCQ, Long> {
    List<MCQ> findByCategory(String category);
    List<MCQ> findByDifficulty(String difficulty);
    List<MCQ> findByQuestionContainingIgnoreCase(String keyword);
    List<MCQ> findByCategoryAndDifficulty(String category, String difficulty);
}
