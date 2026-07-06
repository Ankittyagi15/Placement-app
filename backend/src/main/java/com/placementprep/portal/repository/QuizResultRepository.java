package com.placementprep.portal.repository;

import com.placementprep.portal.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByCategory(String category);
    List<QuizResult> findAllByOrderByAttemptedAtDesc();

    @Query("SELECT AVG(q.percentage) FROM QuizResult q")
    Double getAverageScore();

    @Query("SELECT MAX(q.percentage) FROM QuizResult q")
    Double getHighestScore();

    @Query("SELECT MIN(q.percentage) FROM QuizResult q")
    Double getLowestScore();
}
