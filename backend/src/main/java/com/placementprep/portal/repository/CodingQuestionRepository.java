package com.placementprep.portal.repository;

import com.placementprep.portal.entity.CodingQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CodingQuestionRepository extends JpaRepository<CodingQuestion, Long> {
    List<CodingQuestion> findByTopic(String topic);
    List<CodingQuestion> findByDifficulty(String difficulty);
    List<CodingQuestion> findByTitleContainingIgnoreCase(String keyword);
    List<CodingQuestion> findByTopicAndDifficulty(String topic, String difficulty);
}
