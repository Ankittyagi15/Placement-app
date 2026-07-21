import { useState } from "react";
import { useFetch } from "../hooks/useCustomHooks";
import { mcqService } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import SearchFilter from "../components/SearchFilter";
import MCQCard from "../components/MCQCard";
import "./MCQPage.css";

const MCQPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [results, setResults] = useState(null);

  const { data: mcqs = [], loading, error } = useFetch(() =>
    mcqService.getAllMCQs()
  );

  const categories = [
    "Operating System",
    "Computer Networks",
    "Java",
    "DBMS",
    "OOP",
    "SQL",
  ];

  const difficulties = ["Easy", "Medium", "Hard"];

  const itemsPerPage = 5;

  const mcqsArray = Array.isArray(mcqs) ? mcqs : [];

  const invalidMCQResponse =
    mcqs != null && !Array.isArray(mcqs);

  const filteredMCQs = mcqsArray.filter((mcq) => {
    const matchesSearch = mcq.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || mcq.category === selectedCategory;

    const matchesDifficulty =
      !selectedDifficulty ||
      mcq.difficulty === selectedDifficulty;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty
    );
  });

  const totalPages = Math.ceil(
    filteredMCQs.length / itemsPerPage
  );

  const startIdx =
    (currentPage - 1) * itemsPerPage;

  const paginatedMCQs =
    filteredMCQs.slice(
      startIdx,
      startIdx + itemsPerPage
    );

  const progress =
    filteredMCQs.length === 0
      ? 0
      : Math.round(
          (Object.keys(selectedAnswers).length /
            filteredMCQs.length) *
            100
        );

  const handleSelectAnswer = (
    mcqId,
    answer
  ) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [mcqId]: answer,
    });
  };

  const handleSubmit = () => {
    if (
      Object.keys(selectedAnswers).length <
      filteredMCQs.length
    ) {
      alert(
        "Please answer all questions before submitting!"
      );
      return;
    }

    let correct = 0;

    filteredMCQs.forEach((mcq) => {
      const selectedOptionText = {
        A: mcq.optionA,
        B: mcq.optionB,
        C: mcq.optionC,
        D: mcq.optionD,
      }[selectedAnswers[mcq.id]];

      if (
        selectedOptionText === mcq.correctAnswer
      ) {
        correct++;
      }
    });

    const total = filteredMCQs.length;

    const wrong = total - correct;

    const percentage =
      (correct / total) * 100;

    setResults({
      total,
      correct,
      wrong,
      percentage: percentage.toFixed(2),
    });

    setShowResults(true);

    setSuccessMessage(
      "🎉 Quiz submitted successfully!"
    );
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

      <div className="mcq-hero">

        <div className="container">

          <span className="hero-tag">
            🚀 Placement Preparation
          </span>

          <h1>
            Master Technical MCQs
          </h1>

          <p>
            Practice Java, SQL, DBMS,
            Operating System, OOP and
            Computer Networks with
            company-level questions.
          </p>

        </div>

      </div>

      <div className="container">

        <div className="progress-card">

          <div className="progress-top">

            <span>
              Quiz Progress
            </span>

            <span>
              {progress}%
            </span>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>

        </div>

        {(error || invalidMCQResponse) && (
          <ErrorMessage
            message={
              invalidMCQResponse
                ? "Invalid API response."
                : error
            }
          />
        )}

        {successMessage && (
          <SuccessMessage
            message={successMessage}
          />
        )}
                {results && (
          <div className="results-card">

            <h2>🎉 Quiz Completed</h2>

            <p className="results-subtitle">
              Here's your performance summary
            </p>

            <div className="results-grid">

              <div className="result-box">
                <h3>{results.total}</h3>
                <span>Total</span>
              </div>

              <div className="result-box correct">
                <h3>{results.correct}</h3>
                <span>Correct</span>
              </div>

              <div className="result-box wrong">
                <h3>{results.wrong}</h3>
                <span>Wrong</span>
              </div>

              <div className="result-box score">
                <h3>{results.percentage}%</h3>
                <span>Score</span>
              </div>

            </div>

            <button
              className="btn retry-btn"
              onClick={handleRetry}
            >
              🔄 Take Another Quiz
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

            <div className="question-header">

              <h2>
                Questions
              </h2>

              <span>
                {startIdx + 1} -
                {Math.min(
                  startIdx + itemsPerPage,
                  filteredMCQs.length
                )}{" "}
                of {filteredMCQs.length}
              </span>

            </div>

            {paginatedMCQs.length > 0 ? (
              <>

                <div className="questions-container">

                  {paginatedMCQs.map((mcq) => (

                    <MCQCard
                      key={mcq.id}
                      mcq={mcq}
                      selectedAnswer={
                        selectedAnswers[mcq.id]
                      }
                      onSelectAnswer={
                        handleSelectAnswer
                      }
                      showCorrect={showResults}
                    />

                  ))}

                </div>

                <div className="pagination-container">

                  <button
                    className="btn page-btn"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage(
                        currentPage - 1
                      )
                    }
                  >
                    ⬅ Previous
                  </button>

                  <div className="page-number">

                    Page {currentPage} of {totalPages}

                  </div>

                  <button
                    className="btn page-btn"
                    disabled={
                      currentPage === totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        currentPage + 1
                      )
                    }
                  >
                    Next ➜
                  </button>

                </div>

                {currentPage === totalPages && (

                  <div className="submit-container">

                    <button
                      className="btn submit-btn"
                      onClick={handleSubmit}
                    >
                      🚀 Submit Quiz
                    </button>

                  </div>

                )}

              </>
            ) : (

              <div className="no-results">

                <h2>
                  😕 No Questions Found
                </h2>

                <p>
                  Try changing the filters
                  or search keyword.
                </p>

              </div>

            )}

          </>
        )}

      </div>

    </div>
  );
};

export default MCQPage;
