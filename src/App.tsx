import './App.css';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Outlet />
    </div>
  );
}
