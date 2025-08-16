import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">About Page</h1>
      <Link to="/" className="text-blue-500 underline">
        ← Back to Home
      </Link>
    </div>
  );
}
