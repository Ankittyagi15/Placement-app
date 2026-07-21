import { getDifficultyColor } from "../utils/helpers";
import "./MCQCard.css";

const MCQCard = ({
  mcq,
  onSelectAnswer,
  showCorrect,
  selectedAnswer,
}) => {
  return (
    <div className="mcq-card">

      <div className="mcq-top">

        <span
          className="difficulty-badge"
          style={{
            backgroundColor: getDifficultyColor(
              mcq.difficulty
            ),
          }}
        >
          {mcq.difficulty}
        </span>

        <span className="category-badge">
          {mcq.category}
        </span>

      </div>

      <h2 className="question-title">
        {mcq.question}
      </h2>

      <div className="options">

        {["optionA", "optionB", "optionC", "optionD"].map(
          (option, index) => {
            const letter =
              String.fromCharCode(65 + index);

            const isCorrect =
              mcq.correctAnswer === mcq[option];

            const isSelected =
              selectedAnswer === letter;

            const isWrong =
              isSelected &&
              !isCorrect &&
              showCorrect;

            return (
              <label
                key={option}
                className={`option-card
                  ${isSelected ? "selected" : ""}
                  ${
                    showCorrect && isCorrect
                      ? "correct"
                      : ""
                  }
                  ${
                    showCorrect && isWrong
                      ? "wrong"
                      : ""
                  }`}
              >
                <input
                  type="radio"
                  name={`mcq-${mcq.id}`}
                  value={letter}
                  checked={isSelected}
                  disabled={showCorrect}
                  onChange={(e) =>
                    !showCorrect &&
                    onSelectAnswer(
                      mcq.id,
                      e.target.value
                    )
                  }
                />

                <div className="option-circle">
                  {letter}
                </div>

                <span className="option-text">
                  {mcq[option]}
                </span>

                {showCorrect &&
                  isCorrect && (
                    <span className="answer-icon">
                      ✅
                    </span>
                  )}

                {showCorrect &&
                  isWrong && (
                    <span className="answer-icon">
                      ❌
                    </span>
                  )}
              </label>
            );
          }
        )}

      </div>

      {showCorrect &&
        mcq.explanation && (
          <div className="answer-explanation">

            <h4>
              📖 Explanation
            </h4>

            <p>
              {mcq.explanation}
            </p>

          </div>
        )}

    </div>
  );
};

export default MCQCard;
