import { getDifficultyColor } from '../utils/helpers';
import './MCQCard.css';

const MCQCard = ({ mcq, isSelected, onSelect, onSelectAnswer, showCorrect, selectedAnswer }) => {
  return (
    <div className="mcq-card">
      <div className="mcq-header">
        <span 
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor(mcq.difficulty) }}
        >
          {mcq.difficulty}
        </span>
        <span className="category-badge">{mcq.category}</span>
      </div>

      <h3 className="mcq-question">{mcq.question}</h3>

      <div className="mcq-options">
        {['optionA', 'optionB', 'optionC', 'optionD'].map((option, index) => {
          const letter = String.fromCharCode(65 + index);
          const isCorrect = mcq.correctAnswer === letter;
          const isSelected = selectedAnswer === letter;
          const isWrong = isSelected && !isCorrect && showCorrect;

          return (
            <label
              key={option}
              className={`option-label ${isSelected ? 'selected' : ''} ${
                showCorrect && isCorrect ? 'correct' : ''
              } ${showCorrect && isWrong ? 'wrong' : ''}`}
            >
              <input
                type="radio"
                name={`mcq-${mcq.id}`}
                value={letter}
                checked={isSelected}
                onChange={(e) => !showCorrect && onSelectAnswer(mcq.id, e.target.value)}
                disabled={showCorrect}
              />
              <span className="option-letter">{letter}</span>
              <span className="option-text">{mcq[option.toLowerCase()]}</span>
              {showCorrect && isCorrect && <span className="check-mark">✓</span>}
              {showCorrect && isWrong && <span className="cross-mark">✗</span>}
            </label>
          );
        })}
      </div>

      {mcq.explanation && showCorrect && (
        <div className="explanation">
          <strong>Explanation:</strong> {mcq.explanation}
        </div>
      )}
    </div>
  );
};

export default MCQCard;
