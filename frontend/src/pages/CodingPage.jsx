import { useState } from 'react';
import { useFetch } from '../hooks/useCustomHooks';
import { codingQuestionService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SearchFilter from '../components/SearchFilter';
import CodingQuestionCard from '../components/CodingQuestionCard';
import './CodingPage.css';

const CodingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: questions = [], loading, error } = useFetch(() =>
    codingQuestionService.getAllCodingQuestions()
  );

  const topics = [
    'Arrays',
    'Strings',
    'Linked List',
    'Stack',
    'Queue',
    'Binary Tree',
    'BST',
    'Heap',
    'Graph',
    'Recursion',
    'Backtracking',
    'Sliding Window',
    'Dynamic Programming',
    'Searching',
    'Sorting',
    'Greedy'
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const itemsPerPage = 9;

  const filteredQuestions = (questions || []).filter((question) => {
    const matchesSearch = question.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesTopic =
      !selectedTopic || question.topic === selectedTopic;

    const matchesDifficulty =
      !selectedDifficulty ||
      question.difficulty === selectedDifficulty;

    return (
      matchesSearch &&
      matchesTopic &&
      matchesDifficulty
    );
  });

  const totalPages = Math.ceil(
    filteredQuestions.length / itemsPerPage
  );

  const startIdx =
    (currentPage - 1) * itemsPerPage;

  const paginatedQuestions =
    filteredQuestions.slice(
      startIdx,
      startIdx + itemsPerPage
    );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="coding-page">

      {/* Hero */}

      <section className="coding-hero">

        <div className="container">

          <span className="hero-tag">
            💻 Coding Interview Practice
          </span>

          <h1>Master Coding Challenges</h1>

          <p>
            Practice interview coding problems,
            improve problem-solving skills,
            and prepare for top companies.
          </p>

        </div>

      </section>

      <div className="container">

        {error && (
          <ErrorMessage message={error} />
        )}

        {/* Statistics */}

        <div className="stats-card">

          <div className="stat-box">
            <h2>{questions.length}</h2>
            <p>Total Questions</p>
          </div>

          <div className="stat-box">
            <h2>{filteredQuestions.length}</h2>
            <p>Filtered</p>
          </div>

          <div className="stat-box">
            <h2>{topics.length}</h2>
            <p>Topics</p>
          </div>

          <div className="stat-box">
            <h2>{difficulties.length}</h2>
            <p>Levels</p>
          </div>

        </div>

        {/* Search */}

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedTopic}
          setSelectedCategory={setSelectedTopic}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          categories={topics}
          difficulties={difficulties}
          placeholder="Search coding questions..."
        />

        {/* Questions */}

        {paginatedQuestions.length > 0 ? (
          <>

            <div className="coding-grid">

              {paginatedQuestions.map((question) => (
                <CodingQuestionCard
                  key={question.id}
                  question={question}
                />
              ))}

            </div>

            {/* Pagination */}

            {totalPages > 1 && (

              <div className="pagination-container">

                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage(currentPage - 1)
                  }
                >
                  ← Previous
                </button>

                <span className="page-number">
                  {currentPage} / {totalPages}
                </span>

                <button
                  className="page-btn"
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    setCurrentPage(currentPage + 1)
                  }
                >
                  Next →
                </button>

              </div>

            )}

          </>
        ) : (

          <div className="no-results">

            <h2>No Questions Found</h2>

            <p>
              Try changing your search or filters.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default CodingPage;
