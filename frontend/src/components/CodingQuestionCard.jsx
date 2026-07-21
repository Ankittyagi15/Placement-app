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

      <div className="card-top">

        <span className="platform-badge">
          {question.platform}
        </span>

        <span
          className="difficulty-badge"
          style={{
            backgroundColor: getDifficultyColor(question.difficulty)
          }}
        >
          {question.difficulty}
        </span>

      </div>

      <h2 className="coding-title">

        {question.title}

      </h2>

      <div className="coding-tags">

        <span
          className="topic-badge"
          style={{
            backgroundColor: getTopicColor(question.topic)
          }}
        >
          {question.topic}
        </span>

        {question.problemNumber && (

          <span className="problem-number">

            #{question.problemNumber}

          </span>

        )}

      </div>

      <p className="coding-description">

        {question.description}

      </p>

      <button
        className="solve-btn"
        onClick={handleSolve}
      >
        Solve Challenge →
      </button>

    </div>

  );

};

export default CodingQuestionCard;
