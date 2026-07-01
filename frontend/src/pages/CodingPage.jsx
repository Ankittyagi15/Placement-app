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

  const topics = ['Arrays', 'Strings', 'Linked List', 'Stack', 'Queue', 'Binary Tree', 'BST', 'Heap', 'Graph', 'Recursion', 'Backtracking', 'Sliding Window', 'Dynamic Programming', 'Searching', 'Sorting', 'Greedy'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const itemsPerPage = 9;

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = !selectedTopic || question.topic === selectedTopic;
    const matchesDifficulty = !selectedDifficulty || question.difficulty === selectedDifficulty;
    return matchesSearch && matchesTopic && matchesDifficulty;
  });

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(startIdx, startIdx + itemsPerPage);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="coding-page">
      <div className="container">
        <div className="page-header">
          <h1>Coding Challenges</h1>
          <p>Practice coding problems and improve your skills</p>
        </div>

        {error && <ErrorMessage message={error} />}

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedTopic}
          setSelectedCategory={setSelectedTopic}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          categories={topics}
          difficulties={difficulties}
          placeholder="Search coding challenges..."
        />

        {paginatedQuestions.length > 0 ? (
          <>
            <div className="coding-grid">
              {paginatedQuestions.map((question) => (
                <CodingQuestionCard key={question.id} question={question} />
              ))}
            </div>

            {totalPages > 1 && (
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
            )}
          </>
        ) : (
          <div className="no-results">
            <p>No coding questions found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodingPage;
