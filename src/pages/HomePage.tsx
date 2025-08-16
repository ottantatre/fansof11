import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <Button asChild>
        <Link to="/about">Go to About</Link>
      </Button>
    </div>
  );
}
