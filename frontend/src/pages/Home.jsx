export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome to Placement Prep</h1>
      <p>Browse curated resources, submit feedback, and for admins moderate submissions.</p>
      <ul className="grid sm:grid-cols-2 gap-4">
        <li className="p-4 bg-white rounded shadow">Aptitude practice sets with solutions.</li>
        <li className="p-4 bg-white rounded shadow">DSA coding problems and guides.</li>
        <li className="p-4 bg-white rounded shadow">Interview tips and HR preparation.</li>
        <li className="p-4 bg-white rounded shadow">Company-wise preparation notes.</li>
      </ul>
    </div>
  );
}


