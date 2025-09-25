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

  async function load() {
    const params = new URLSearchParams({ kind: 'mcq' });
    if (tag) params.set('tag', tag);
    if (difficulty) params.set('difficulty', difficulty);
    const res = await fetch(`${API_BASE}/questions?${params.toString()}`);
    const data = await res.json();
    setItems(data.items || []);
  }
  useEffect(() => { load(); }, []);

  async function submitSample() {
    const q = { kind: 'mcq', title: 'Sample Ratio MCQ', difficulty: 'Easy', tags: ['quant'], question: 'Ratio of 2:3 increased by 1 on each side?', options: ['3:4','4:5','5:6','6:7'], answerIndex: 2 };
    const res = await fetch(`${API_BASE}/questions`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify(q) });
    if (res.ok) alert('Submitted for moderation');
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">MCQ Question Bank (Quant, Verbal, etc.)</h2>
      <div className="flex flex-wrap gap-2">
        <input className="border px-3 py-2 rounded" placeholder="Tag (e.g., quant, verbal)" value={tag} onChange={(e)=>setTag(e.target.value)} />
        <select className="border px-3 py-2 rounded" value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
          <option value="">All Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <button onClick={load} className="bg-pink-600 text-white px-4 py-2 rounded">Apply</button>
        {user && <button onClick={submitSample} className="bg-fuchsia-600 text-white px-3 py-2 rounded">Submit Sample</button>}
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={showAnswers} onChange={(e)=>setShowAnswers(e.target.checked)} />
          Show correct answers
        </label>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-700">Quick Exam:</span>
          <input type="number" min="3" max="50" value={examSize} onChange={(e)=>setExamSize(Number(e.target.value)||5)} className="w-20 border px-2 py-1 rounded" />
          {!examMode ? (
            <button className="bg-emerald-600 text-white px-3 py-1 rounded" onClick={() => {
              const shuffled = [...items].sort(()=>Math.random()-0.5).slice(0, examSize);
              setExamQs(shuffled); setAnswers({}); setScore(null); setExamMode(true); setShowAnswers(false);
            }}>Start</button>
          ) : (
            <button className="bg-gray-700 text-white px-3 py-1 rounded" onClick={() => { setExamMode(false); setExamQs([]); setScore(null); }}>Exit</button>
          )}
          {examMode && (
            <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => {
              let s = 0; examQs.forEach(q => { if (answers[q._id] === q.answerIndex) s++; });
              setScore({ correct: s, total: examQs.length }); setShowAnswers(true);
            }}>Submit</button>
          )}
          {score && <span className="text-sm font-medium text-emerald-700">Score: {score.correct} / {score.total}</span>}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {(examMode ? examQs : items).map((q) => (
          <article key={q._id} className="bg-white p-4 rounded shadow border-l-4 border-pink-500">
            <h3 className="font-semibold">{q.title}</h3>
            <p className="text-xs text-gray-500">{q.difficulty} · {q.tags?.join(', ')}</p>
            <p className="text-sm mt-2">{q.question}</p>
            <ol className="list-decimal ml-6 text-sm mt-2 space-y-1">
              {q.options?.map((opt, i) => {
                const isCorrect = showAnswers && typeof q.answerIndex === 'number' && i === q.answerIndex;
                const chosen = answers[q._id] === i;
                return (
                  <li key={i} className={(isCorrect ? 'font-semibold text-green-700 ' : '') + (chosen && !isCorrect && showAnswers ? 'text-red-700 ' : '')}>
                    <label className="flex items-center gap-2">
                      {examMode ? (
                        <input type="radio" name={`ans-${q._id}`} checked={chosen || false} onChange={() => setAnswers(a=>({ ...a, [q._id]: i }))} />
                      ) : null}
                      <span>{opt}</span>
                      {isCorrect && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Correct</span>}
                    </label>
                  </li>
                );
              })}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}


