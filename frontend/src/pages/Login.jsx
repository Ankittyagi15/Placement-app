import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('testadmin@example.com');
  const [password, setPassword] = useState('TestPass123');
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    try { await login(email, password); nav('/'); } catch (e) { setError(e.message); }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto space-y-3 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Login</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="w-full border p-2 rounded" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
    </form>
  );
}


