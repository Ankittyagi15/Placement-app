import { useFetch } from '../hooks/useCustomHooks';
import { quizService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { formatDate } from '../utils/helpers';
import './ResultsPage.css';

const ResultsPage = () => {
  const { data: results = [], loading: resultsLoading, error: resultsError } = useFetch(() => 
    quizService.getAllResults()
  );
  const { data: stats = {}, loading: statsLoading, error: statsError } = useFetch(() => 
    quizService.getOverallStats()
  );

  if (resultsLoading || statsLoading) return <LoadingSpinner />;

  const highestScore = stats.highestScore || 0;
  const lowestScore = stats.lowestScore || 0;
  const averageScore = stats.averageScore || 0;
  const totalAttempts = stats.totalAttempts || 0;

  return (
    <div className="results-page">
      <div className="container">
        <div className="page-header">
          <h1>Quiz Results</h1>
          <p>Track your progress and performance</p>
        </div>

        {resultsError && <ErrorMessage message={resultsError} />}
        {statsError && <ErrorMessage message={statsError} />}

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">Total Attempts</div>
              <div className="stat-value">{totalAttempts}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-label">Highest Score</div>
              <div className="stat-value">{highestScore.toFixed(2)}%</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📉</div>
            <div className="stat-content">
              <div className="stat-label">Lowest Score</div>
              <div className="stat-value">{lowestScore.toFixed(2)}%</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <div className="stat-label">Average Score</div>
              <div className="stat-value">{averageScore.toFixed(2)}%</div>
            </div>
          </div>
        </div>

        {/* Recent Attempts */}
        <div className="recent-attempts">
          <h2>Recent Attempts</h2>
          {results.length > 0 ? (
            <div className="results-table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Total</th>
                    <th>Correct</th>
                    <th>Wrong</th>
                    <th>Score</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.id}>
                      <td><strong>{result.category}</strong></td>
                      <td>{result.totalQuestions}</td>
                      <td className="correct">{result.correctAnswers}</td>
                      <td className="wrong">{result.wrongAnswers}</td>
                      <td className="score">{result.percentage.toFixed(2)}%</td>
                      <td>{formatDate(result.attemptedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-results">
              <p>No quiz attempts yet. Start taking quizzes to see your results here.</p>
            </div>
          )}
        </div>

        {/* Category Wise Performance */}
        {results.length > 0 && (
          <div className="category-performance">
            <h2>Category-wise Performance</h2>
            <div className="performance-grid">
              {Object.entries(
                results.reduce((acc, result) => {
                  if (!acc[result.category]) {
                    acc[result.category] = [];
                  }
                  acc[result.category].push(result);
                  return acc;
                }, {})
              ).map(([category, categoryResults]) => {
                const avgScore = (categoryResults.reduce((sum, r) => sum + r.percentage, 0) / categoryResults.length).toFixed(2);
                const attempts = categoryResults.length;

                return (
                  <div key={category} className="performance-card">
                    <div className="category-name">{category}</div>
                    <div className="performance-stats">
                      <div className="perf-stat">
                        <span className="perf-label">Attempts</span>
                        <span className="perf-value">{attempts}</span>
                      </div>
                      <div className="perf-stat">
                        <span className="perf-label">Avg Score</span>
                        <span className="perf-value">{avgScore}%</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${avgScore}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
