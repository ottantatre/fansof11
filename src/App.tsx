import { Outlet } from 'react-router-dom';
import Nav from '@components/Nav';

export function App() {
  return (
    <div className="flex flex-col">
      <Nav />
      <main className="h-main overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
