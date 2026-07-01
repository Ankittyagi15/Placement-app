import { getTopicColor, getDifficultyColor } from '../utils/helpers';
import './CodingQuestionCard.css';

const CodingQuestionCard = ({ question }) => {
  const handleSolve = () => {
    if (question.platformUrl) {
      window.open(question.platformUrl, '_blank');
    }
  };

  return (
    <div className="coding-card">
      <div className="coding-header">
        <h3 className="coding-title">{question.title}</h3>
        <span className="platform-badge">{question.platform}</span>
      </div>

      <div className="coding-meta">
        <span 
          className="topic-badge"
          style={{ backgroundColor: getTopicColor(question.topic) }}
        >
          {question.topic}
        </span>
        <span 
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor(question.difficulty) }}
        >
          {question.difficulty}
        </span>
      </div>

      <p className="coding-description">{question.description}</p>

      <div className="coding-footer">
        {question.problemNumber && (
          <span className="problem-number">Problem #{question.problemNumber}</span>
        )}
        <button className="btn btn-primary" onClick={handleSolve}>
          Solve Now ↗
        </button>
      </div>
    </div>
  );
};

export default CodingQuestionCard;
