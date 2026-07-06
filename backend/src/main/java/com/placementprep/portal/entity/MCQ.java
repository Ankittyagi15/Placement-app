package com.placementprep.portal.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mcqs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MCQ {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Question cannot be blank")
    @Column(columnDefinition = "TEXT")
    private String question;

    @NotBlank(message = "Option A cannot be blank")
    @Column(name = "option_a")
    private String optionA;

    @NotBlank(message = "Option B cannot be blank")
    @Column(name = "option_b")
    private String optionB;

    @NotBlank(message = "Option C cannot be blank")
    @Column(name = "option_c")
    private String optionC;

    @NotBlank(message = "Option D cannot be blank")
    @Column(name = "option_d")
    private String optionD;

    @NotBlank(message = "Correct answer cannot be blank")
    @Column(name = "correct_answer")
    private String correctAnswer;

    @NotBlank(message = "Category cannot be blank")
    private String category;

    @NotBlank(message = "Difficulty cannot be blank")
    private String difficulty;

    @Column(columnDefinition = "TEXT")
    private String explanation;
}
