import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Nie znaleziono strony</h1>
      <p>Ups, taka strona nie istnieje.</p>
      <Link to="/">⬅️ Wróć na stronę główną</Link>
    </div>
  );
}
