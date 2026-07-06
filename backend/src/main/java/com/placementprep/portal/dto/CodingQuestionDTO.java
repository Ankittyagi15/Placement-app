package com.placementprep.portal.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodingQuestionDTO {

    private Long id;

    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotBlank(message = "Topic cannot be blank")
    private String topic;

    @NotBlank(message = "Difficulty cannot be blank")
    private String difficulty;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotBlank(message = "Platform cannot be blank")
    private String platform;

    private String platformUrl;

    private String problemNumber;
}
