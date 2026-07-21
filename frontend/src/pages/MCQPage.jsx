import { useState } from 'react';
import { useFetch } from '../hooks/useCustomHooks';
import { mcqService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import SearchFilter from '../components/SearchFilter';
import MCQCard from '../components/MCQCard';
import './MCQPage.css';

const MCQPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [results, setResults] = useState(null);

  const { data: mcqs = [], loading, error, refetch } = useFetch(() => mcqService.getAllMCQs());
    console.log("MCQs:", mcqs);
    console.log("Is Array:", Array.isArray(mcqs));

  const categories = ['Operating System', 'Computer Networks', 'Java', 'DBMS', 'OOP', 'SQL'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const itemsPerPage = 5;

  const mcqsArray = Array.isArray(mcqs) ? mcqs : [];
  const invalidMCQResponse = mcqs != null && !Array.isArray(mcqs);

  const filteredMCQs = mcqsArray.filter(mcq => {
    const matchesSearch = mcq.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || mcq.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || mcq.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const totalPages = Math.ceil(filteredMCQs.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedMCQs = filteredMCQs.slice(startIdx, startIdx + itemsPerPage);

  const handleSelectAnswer = (mcqId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [mcqId]: answer,
    });
  };

  const handleSubmit = async () => {
   if (Object.keys(selectedAnswers).length < filteredMCQs.length){
  alert('Please answer all questions before submitting!');
  return;
}
    

    let correct = 0;
    filteredMCQs.forEach(mcq => {
    const selectedOptionText = {
        A: mcq.optionA,
        B: mcq.optionB,
        C: mcq.optionC,
        D: mcq.optionD,
    }[selectedAnswers[mcq.id]];

    if (selectedOptionText === mcq.correctAnswer) {
        correct++;
    }
});

    const total = filteredMCQs.length;
    const wrong = total - correct;
    const percentage = (correct / total) * 100;

    setResults({
      total,
      correct,
      wrong,
      percentage: percentage.toFixed(2),
    });

    setShowResults(true);
    setSuccessMessage('Quiz submitted successfully!');
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setResults(null);
    setCurrentPage(1);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mcq-page">
      <div className="container">
        <div className="page-header">
          <h1>MCQ Practice</h1>
          <p>Test your knowledge with our comprehensive MCQ questions</p>
        </div>

        {(error || invalidMCQResponse) && (
          <ErrorMessage
            message={
              invalidMCQResponse
                ? 'Invalid API response received. Check backend URL configuration.'
                : error
            }
          />
        )}
        {successMessage && (
          <SuccessMessage message={successMessage} />
        )}

        {results && (
          <div className="results-card">
            <h2>Quiz Results</h2>
            <div className="results-grid">
              <div className="result-item">
                <div className="result-label">Total Questions</div>
                <div className="result-value">{results.total}</div>
              </div>
              <div className="result-item correct">
                <div className="result-label">Correct</div>
                <div className="result-value">{results.correct}</div>
              </div>
              <div className="result-item wrong">
                <div className="result-label">Wrong</div>
                <div className="result-value">{results.wrong}</div>
              </div>
              <div className="result-item score">
                <div className="result-label">Score</div>
                <div className="result-value">{results.percentage}%</div>
              </div>
            </div>
            <button className="btn btn-primary btn-lg mt-3" onClick={handleRetry}>
              Take Another Quiz
            </button>
          </div>
        )}

        {!showResults && (
          <>
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              categories={categories}
              difficulties={difficulties}
              placeholder="Search questions..."
            />

            {paginatedMCQs.length > 0 ? (
              <>
                <div className="questions-container">
                  {paginatedMCQs.map((mcq) => (
                    <MCQCard
                      key={mcq.id}
                      mcq={mcq}
                      selectedAnswer={selectedAnswers[mcq.id]}
                      onSelectAnswer={handleSelectAnswer}
                      showCorrect={showResults}
                    />
                  ))}
                </div>

                <div className="pagination-container">
                  <button
                    className="btn btn-secondary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                  <span className="page-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-secondary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>

                {totalPages === currentPage && (
                  <div className="submit-button-container">
                    <button
                      className="btn btn-success btn-lg"
                      onClick={handleSubmit}
                    >
                      Submit Quiz
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-results">
                <p>No questions found. Try adjusting your filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MCQPage;
