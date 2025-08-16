import './App.css';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* miejsce na navbar, footer, sidebar itd. */}
      <Outlet />
    </div>
  );
}
