import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Coding() {
  const { API_BASE, authHeaders, user } = useAuth();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [source, setSource] = useState('');
  const [difficulty, setDifficulty] = useState('');

  async function load() {
    const params = new URLSearchParams({ kind: 'coding' });
    if (q) params.set('q', q);
    if (source) params.set('tag', source);
    if (difficulty) params.set('difficulty', difficulty);
    const res = await fetch(`${API_BASE}/questions?${params.toString()}`);
    const data = await res.json();
    setItems(data.items || []);
  }
  useEffect(() => { load(); }, []);

  async function submitSample() {
    const sample = { kind: 'coding', title: 'Sample Two Sum', source: 'LeetCode', difficulty: 'Easy', description: 'Find two numbers that sum to target', tags: ['array'] };
    const res = await fetch(`${API_BASE}/questions`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify(sample) });
    if (res.ok) alert('Submitted for moderation');
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Coding Questions (LeetCode & GFG)</h2>
      <div className="flex flex-wrap gap-2">
        <input className="border px-3 py-2 rounded" placeholder="Search..." value={q} onChange={(e)=>setQ(e.target.value)} />
        <select className="border px-3 py-2 rounded" value={source} onChange={(e)=>setSource(e.target.value)}>
          <option value="">All Tags</option>
          <option value="LeetCode">LeetCode</option>
          <option value="GFG">GFG</option>
        </select>
        <select className="border px-3 py-2 rounded" value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
          <option value="">All Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <button onClick={load} className="bg-indigo-600 text-white px-4 py-2 rounded">Apply</button>
        {user && <button onClick={submitSample} className="bg-purple-600 text-white px-3 py-2 rounded">Submit Sample</button>}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(q => (
          <article key={q._id} className="bg-white p-4 rounded shadow border-l-4 border-indigo-500">
            <h3 className="font-semibold">{q.title} <span className="text-xs ml-2 px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">{q.source}</span></h3>
            <p className="text-xs text-gray-500">{q.difficulty} · {q.tags?.join(', ')}</p>
            <p className="text-sm mt-2">{q.description}</p>
            {q.link && <a className="text-indigo-600 text-sm" href={q.link} target="_blank" rel="noreferrer">Open Link</a>}
          </article>
        ))}
      </div>
    </div>
  );
}


