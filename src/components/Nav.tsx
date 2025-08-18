import { Link, NavLink } from 'react-router-dom';

export default function Nav() {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? 'font-semibold underline' : ''}`;

  return (
    <nav className="w-full border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-lg">
          Fansof11
        </Link>
        <div className="flex items-center gap-2">
          <NavLink to="/" className={linkCls}>
            Home
          </NavLink>
          <NavLink to="/login" className={linkCls}>
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
