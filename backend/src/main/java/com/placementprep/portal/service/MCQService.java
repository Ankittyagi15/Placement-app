package com.placementprep.portal.service;

import com.placementprep.portal.dto.MCQDTO;
import com.placementprep.portal.entity.MCQ;
import com.placementprep.portal.exception.ResourceNotFoundException;
import com.placementprep.portal.repository.MCQRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MCQService {

    private final MCQRepository mcqRepository;

    public MCQService(MCQRepository mcqRepository) {
        this.mcqRepository = mcqRepository;
    }

    public List<MCQDTO> getAllMCQs() {
        return mcqRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MCQDTO getMCQById(Long id) {
        MCQ mcq = mcqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MCQ not found with id: " + id));
        return convertToDTO(mcq);
    }

    public List<MCQDTO> getMCQsByCategory(String category) {
        return mcqRepository.findByCategory(category).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<MCQDTO> getMCQsByDifficulty(String difficulty) {
        return mcqRepository.findByDifficulty(difficulty).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<MCQDTO> searchMCQs(String keyword) {
        return mcqRepository.findByQuestionContainingIgnoreCase(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<MCQDTO> filterMCQs(String category, String difficulty) {
        return mcqRepository.findByCategoryAndDifficulty(category, difficulty).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MCQDTO createMCQ(MCQDTO mcqDTO) {
        MCQ mcq = convertToEntity(mcqDTO);
        MCQ savedMCQ = mcqRepository.save(mcq);
        return convertToDTO(savedMCQ);
    }

    public MCQDTO updateMCQ(Long id, MCQDTO mcqDTO) {
        MCQ mcq = mcqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MCQ not found with id: " + id));

        mcq.setQuestion(mcqDTO.getQuestion());
        mcq.setOptionA(mcqDTO.getOptionA());
        mcq.setOptionB(mcqDTO.getOptionB());
        mcq.setOptionC(mcqDTO.getOptionC());
        mcq.setOptionD(mcqDTO.getOptionD());
        mcq.setCorrectAnswer(mcqDTO.getCorrectAnswer());
        mcq.setCategory(mcqDTO.getCategory());
        mcq.setDifficulty(mcqDTO.getDifficulty());
        mcq.setExplanation(mcqDTO.getExplanation());

        MCQ updatedMCQ = mcqRepository.save(mcq);
        return convertToDTO(updatedMCQ);
    }

    public void deleteMCQ(Long id) {
        MCQ mcq = mcqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MCQ not found with id: " + id));
        mcqRepository.delete(mcq);
    }

    private MCQDTO convertToDTO(MCQ mcq) {
        return MCQDTO.builder()
                .id(mcq.getId())
                .question(mcq.getQuestion())
                .optionA(mcq.getOptionA())
                .optionB(mcq.getOptionB())
                .optionC(mcq.getOptionC())
                .optionD(mcq.getOptionD())
                .correctAnswer(mcq.getCorrectAnswer())
                .category(mcq.getCategory())
                .difficulty(mcq.getDifficulty())
                .explanation(mcq.getExplanation())
                .build();
    }

    private MCQ convertToEntity(MCQDTO mcqDTO) {
        return MCQ.builder()
                .id(mcqDTO.getId())
                .question(mcqDTO.getQuestion())
                .optionA(mcqDTO.getOptionA())
                .optionB(mcqDTO.getOptionB())
                .optionC(mcqDTO.getOptionC())
                .optionD(mcqDTO.getOptionD())
                .correctAnswer(mcqDTO.getCorrectAnswer())
                .category(mcqDTO.getCategory())
                .difficulty(mcqDTO.getDifficulty())
                .explanation(mcqDTO.getExplanation())
                .build();
    }
}
