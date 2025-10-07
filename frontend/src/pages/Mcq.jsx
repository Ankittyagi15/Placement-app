import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Mcq() {
  const { API_BASE, authHeaders, user } = useAuth();
  const [items, setItems] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [tag, setTag] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const [examMode, setExamMode] = useState(false);
  const [examSize, setExamSize] = useState(5);
  const [examQs, setExamQs] = useState([]);
  const [answers, setAnswers] = useState({}); // qId -> index
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ kind: 'mcq' });
      if (tag) params.set('tag', tag);
      if (difficulty) params.set('difficulty', difficulty);
      const res = await fetch(`${API_BASE}/questions?${params.toString()}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => { load(); }, []);

  async function submitSample() {
    const q = { kind: 'mcq', title: 'Sample Ratio MCQ', difficulty: 'Easy', tags: ['quant'], question: 'Ratio of 2:3 increased by 1 on each side?', options: ['3:4','4:5','5:6','6:7'], answerIndex: 2 };
    const res = await fetch(`${API_BASE}/questions`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify(q) });
    if (res.ok) alert('Submitted for moderation');
  }

  const getBadgeClass = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'badge badge-easy';
      case 'Medium': return 'badge badge-medium';
      case 'Hard': return 'badge badge-hard';
      default: return 'badge bg-gray-100 text-gray-800';
    }
  };

  const getTagBadgeClass = (tag) => {
    if (tag.includes('quant')) return 'badge badge-quant';
    if (tag.includes('verbal')) return 'badge badge-verbal';
    if (tag.includes('technical')) return 'badge badge-technical';
    if (tag.includes('logical')) return 'badge badge-logical';
    return 'badge bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="spinner"></div>
        <span className="ml-3 text-gray-600">Loading questions...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">MCQ Question Bank</h1>
        <p className="text-lg text-pink-100">Practice Quantitative, Verbal, Logical & Technical Questions</p>
      </div>

      {/* Controls */}
      <div className="card p-6">
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <div className="flex-1 min-w-48">
            <input 
              className="input-field" 
              placeholder="Filter by tag (e.g., quant, verbal, technical)" 
              value={tag} 
              onChange={(e)=>setTag(e.target.value)} 
            />
          </div>
          <div className="min-w-32">
            <select className="select-field" value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
              <option value="">All Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <button onClick={load} className="btn-primary">
            Apply Filters
          </button>
          {user && (
            <button onClick={submitSample} className="btn-secondary">
              Submit Sample
            </button>
          )}
        </div>

        {/* Exam Mode Controls */}
        <div className="flex flex-wrap gap-4 items-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={showAnswers} onChange={(e)=>setShowAnswers(e.target.checked)} className="rounded" />
              Show correct answers
            </label>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-700 font-medium">Quick Exam:</span>
            <input 
              type="number" 
              min="3" 
              max="50" 
              value={examSize} 
              onChange={(e)=>setExamSize(Number(e.target.value)||5)} 
              className="w-20 border px-2 py-1 rounded text-center" 
            />
            {!examMode ? (
              <button 
                className="btn-success" 
                onClick={() => {
                  const shuffled = [...items].sort(()=>Math.random()-0.5).slice(0, examSize);
                  setExamQs(shuffled); 
                  setAnswers({}); 
                  setScore(null); 
                  setExamMode(true); 
                  setShowAnswers(false);
                }}
              >
                Start Exam
              </button>
            ) : (
              <button 
                className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors" 
                onClick={() => { 
                  setExamMode(false); 
                  setExamQs([]); 
                  setScore(null); 
                }}
              >
                Exit Exam
              </button>
            )}
            {examMode && (
              <button 
                className="btn-primary" 
                onClick={() => {
                  let s = 0; 
                  examQs.forEach(q => { 
                    if (answers[q._id] === q.answerIndex) s++; 
                  });
                  setScore({ correct: s, total: examQs.length }); 
                  setShowAnswers(true);
                }}
              >
                Submit Exam
              </button>
            )}
            {score && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-emerald-700">
                  Score: {score.correct} / {score.total}
                </span>
                <span className="text-sm text-gray-600">
                  ({Math.round((score.correct / score.total) * 100)}%)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {(examMode ? examQs : items).map((q, index) => (
          <article key={q._id} className="card p-6 border-l-4 border-pink-500 hover:border-pink-600 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex-1">{q.title}</h3>
              <div className="flex gap-2 ml-4">
                <span className={getBadgeClass(q.difficulty)}>{q.difficulty}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {q.tags?.map((tag, i) => (
                <span key={i} className={getTagBadgeClass(tag)}>{tag}</span>
              ))}
            </div>
            
            <p className="text-gray-700 mb-4 font-medium">{q.question}</p>
            
            <ol className="space-y-2">
              {q.options?.map((opt, i) => {
                const isCorrect = showAnswers && typeof q.answerIndex === 'number' && i === q.answerIndex;
                const chosen = answers[q._id] === i;
                const isWrong = chosen && !isCorrect && showAnswers;
                
                return (
                  <li key={i} className={`p-3 rounded-lg border transition-all ${
                    isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 
                    isWrong ? 'bg-red-50 border-red-200 text-red-800' :
                    'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      {examMode ? (
                        <input 
                          type="radio" 
                          name={`ans-${q._id}`} 
                          checked={chosen || false} 
                          onChange={() => setAnswers(a=>({ ...a, [q._id]: i }))} 
                          className="text-pink-600 focus:ring-pink-500"
                        />
                      ) : (
                        <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                          {String.fromCharCode(65 + i)}
                        </span>
                      )}
                      <span className="flex-1">{opt}</span>
                      {isCorrect && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          ✓ Correct
                        </span>
                      )}
                      {isWrong && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                          ✗ Wrong
                        </span>
                      )}
                    </label>
                  </li>
                );
              })}
            </ol>
            
            {showAnswers && q.explanation && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Explanation:</span> {q.explanation}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>

      {items.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
          <p className="text-gray-500">Try adjusting your filters or submit some questions!</p>
        </div>
      )}
    </div>
  );
}


