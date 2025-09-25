import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Feedback() {
  const { API_BASE, authHeaders, user } = useAuth();
  const [items, setItems] = useState([]);
  const [content, setContent] = useState('');

  async function load() {
    const res = await fetch(`${API_BASE}/feedback`);
    setItems(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/feedback`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify({ content }) });
    if (res.ok) { setContent(''); alert('Submitted for moderation'); }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <section>
        <h2 className="text-xl font-semibold mb-2">Approved Feedback</h2>
        <ul className="space-y-3">
          {items.map(f => (
            <li key={f._id} className="bg-white p-4 rounded shadow">
              <p className="text-sm">{f.content}</p>
              <p className="text-xs text-gray-500 mt-1">— {f.userName}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Submit Feedback</h2>
        {user ? (
          <form onSubmit={submit} className="space-y-3">
            <textarea value={content} onChange={(e)=>setContent(e.target.value)} className="w-full border rounded p-2" rows={5} placeholder="Share your experience or suggestions..." />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled={!content.trim()}>Submit</button>
          </form>
        ) : (
          <p className="text-sm text-gray-600">Please log in to submit feedback.</p>
        )}
      </section>
    </div>
  );
}


