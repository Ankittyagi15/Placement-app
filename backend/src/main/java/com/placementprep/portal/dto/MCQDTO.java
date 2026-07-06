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
public class MCQDTO {

    private Long id;

    @NotBlank(message = "Question cannot be blank")
    private String question;

    @NotBlank(message = "Option A cannot be blank")
    private String optionA;

    @NotBlank(message = "Option B cannot be blank")
    private String optionB;

    @NotBlank(message = "Option C cannot be blank")
    private String optionC;

    @NotBlank(message = "Option D cannot be blank")
    private String optionD;

    @NotBlank(message = "Correct answer cannot be blank")
    private String correctAnswer;

    @NotBlank(message = "Category cannot be blank")
    private String category;

    @NotBlank(message = "Difficulty cannot be blank")
    private String difficulty;

    private String explanation;
}
