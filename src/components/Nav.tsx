import { Link, NavLink } from 'react-router-dom';

export function Nav() {
  //   const linkCls = ({ isActive }: { isActive: boolean }) =>
  //     `px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? 'font-semibold underline' : ''}`;

  return (
    <nav className="w-full bg-nav-background border-b border-b-slate-300 h-nav-header flex items-center">
      <div className="flex items-center justify-between px-8 w-full">
        <Link to="/" className="font-bold text-lg">
          Fansof11
        </Link>
        <div>
          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </nav>
  );
}
