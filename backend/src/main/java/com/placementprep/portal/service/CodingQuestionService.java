package com.placementprep.portal.service;

import com.placementprep.portal.dto.CodingQuestionDTO;
import com.placementprep.portal.entity.CodingQuestion;
import com.placementprep.portal.exception.ResourceNotFoundException;
import com.placementprep.portal.repository.CodingQuestionRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CodingQuestionService {

    private final CodingQuestionRepository codingQuestionRepository;

    public CodingQuestionService(CodingQuestionRepository codingQuestionRepository) {
        this.codingQuestionRepository = codingQuestionRepository;
    }

    public List<CodingQuestionDTO> getAllCodingQuestions() {
        return codingQuestionRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CodingQuestionDTO getCodingQuestionById(Long id) {
        CodingQuestion question = codingQuestionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coding question not found with id: " + id));
        return convertToDTO(question);
    }

    public List<CodingQuestionDTO> getCodingQuestionsByTopic(String topic) {
        return codingQuestionRepository.findByTopic(topic).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<CodingQuestionDTO> getCodingQuestionsByDifficulty(String difficulty) {
        return codingQuestionRepository.findByDifficulty(difficulty).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<CodingQuestionDTO> searchCodingQuestions(String keyword) {
        return codingQuestionRepository.findByTitleContainingIgnoreCase(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<CodingQuestionDTO> filterCodingQuestions(String topic, String difficulty) {
        return codingQuestionRepository.findByTopicAndDifficulty(topic, difficulty).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CodingQuestionDTO createCodingQuestion(CodingQuestionDTO codingQuestionDTO) {
        CodingQuestion question = convertToEntity(codingQuestionDTO);
        CodingQuestion savedQuestion = codingQuestionRepository.save(question);
        return convertToDTO(savedQuestion);
    }

    public CodingQuestionDTO updateCodingQuestion(Long id, CodingQuestionDTO codingQuestionDTO) {
        CodingQuestion question = codingQuestionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coding question not found with id: " + id));

        question.setTitle(codingQuestionDTO.getTitle());
        question.setTopic(codingQuestionDTO.getTopic());
        question.setDifficulty(codingQuestionDTO.getDifficulty());
        question.setDescription(codingQuestionDTO.getDescription());
        question.setPlatform(codingQuestionDTO.getPlatform());
        question.setPlatformUrl(codingQuestionDTO.getPlatformUrl());
        question.setProblemNumber(codingQuestionDTO.getProblemNumber());

        CodingQuestion updatedQuestion = codingQuestionRepository.save(question);
        return convertToDTO(updatedQuestion);
    }

    public void deleteCodingQuestion(Long id) {
        CodingQuestion question = codingQuestionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coding question not found with id: " + id));
        codingQuestionRepository.delete(question);
    }

    private CodingQuestionDTO convertToDTO(CodingQuestion question) {
        return CodingQuestionDTO.builder()
                .id(question.getId())
                .title(question.getTitle())
                .topic(question.getTopic())
                .difficulty(question.getDifficulty())
                .description(question.getDescription())
                .platform(question.getPlatform())
                .platformUrl(question.getPlatformUrl())
                .problemNumber(question.getProblemNumber())
                .build();
    }

    private CodingQuestion convertToEntity(CodingQuestionDTO dto) {
        return CodingQuestion.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .topic(dto.getTopic())
                .difficulty(dto.getDifficulty())
                .description(dto.getDescription())
                .platform(dto.getPlatform())
                .platformUrl(dto.getPlatformUrl())
                .problemNumber(dto.getProblemNumber())
                .build();
    }
}
