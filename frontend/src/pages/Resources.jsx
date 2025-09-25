import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Resources() {
  const { API_BASE, authHeaders, user } = useAuth();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('createdAt:desc');

  async function load() {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (category) params.set('category', category);
    if (sort) params.set('sort', sort);
    const res = await fetch(`${API_BASE}/resources?${params.toString()}`);
    const data = await res.json();
    setItems(data.items || []);
  }

  useEffect(() => { load(); }, []);

  async function addSample() {
    const sample = { title: 'Sample Resource', category: 'Other', tags: ['sample'], content: 'Example content for testing.' };
    const res = await fetch(`${API_BASE}/resources`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify(sample) });
    if (res.ok) load();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Placement Resources</h2>
      <div className="flex flex-wrap gap-2">
        <input className="border px-3 py-2 rounded" placeholder="Search..." value={q} onChange={(e)=>setQ(e.target.value)} />
        <select className="border px-3 py-2 rounded" value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option>Aptitude</option>
          <option>Coding</option>
          <option>Interview</option>
          <option>Company Guide</option>
          <option>Other</option>
        </select>
        <select className="border px-3 py-2 rounded" value={sort} onChange={(e)=>setSort(e.target.value)}>
          <option value="createdAt:desc">Newest</option>
          <option value="title:asc">Title A-Z</option>
        </select>
        <button onClick={load} className="bg-blue-600 text-white px-4 py-2 rounded">Apply</button>
        {user?.role === 'admin' && (
          <button onClick={addSample} className="bg-green-700 text-white px-3 py-2 rounded">Add Sample (Admin)</button>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((r)=> (
          <article key={r._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{r.title}</h3>
            <p className="text-sm text-gray-500">{r.category} · {r.tags?.join(', ')}</p>
            <p className="mt-2 text-sm">{r.content}</p>
            {r.link && <a className="text-blue-600 text-sm" href={r.link} target="_blank" rel="noreferrer">Open Link</a>}
          </article>
        ))}
      </div>
    </div>
  );
}


