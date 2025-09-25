import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Moderation() {
  const { API_BASE, authHeaders } = useAuth();
  const [items, setItems] = useState([]);

  async function load() {
    const res = await fetch(`${API_BASE}/moderation/pending`, { headers: { ...authHeaders() } });
    if (res.ok) setItems(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function act(id, action) {
    const res = await fetch(`${API_BASE}/moderation/${id}/${action}`, { method: 'POST', headers: { ...authHeaders() } });
    if (res.ok) load();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Moderation Dashboard</h2>
      <ul className="space-y-3">
        {items.map(f => (
          <li key={f._id} className="bg-white p-4 rounded shadow flex items-start justify-between gap-4">
            <div>
              <p className="text-sm">{f.content}</p>
              <p className="text-xs text-gray-500 mt-1">— {f.userName}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => act(f._id, 'approve')} className="bg-green-600 text-white px-3 py-1 rounded">Approve</button>
              <button onClick={() => act(f._id, 'reject')} className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
            </div>
          </li>
        ))}
        {items.length === 0 && <p className="text-sm text-gray-600">No pending feedback.</p>}
      </ul>
    </div>
  );
}


