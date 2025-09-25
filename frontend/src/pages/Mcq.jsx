import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Mcq() {
  const { API_BASE, authHeaders, user } = useAuth();
  const [items, setItems] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [tag, setTag] = useState('');

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
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((q) => (
          <article key={q._id} className="bg-white p-4 rounded shadow border-l-4 border-pink-500">
            <h3 className="font-semibold">{q.title}</h3>
            <p className="text-xs text-gray-500">{q.difficulty} · {q.tags?.join(', ')}</p>
            <p className="text-sm mt-2">{q.question}</p>
            <ol className="list-decimal ml-6 text-sm mt-2 space-y-1">
              {q.options?.map((opt, i) => <li key={i}>{opt}</li>)}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}


