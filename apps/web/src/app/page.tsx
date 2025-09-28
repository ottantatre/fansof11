import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className="min-h-dvh flex items-center justify-center">
      <div className="p-6 rounded-xl border shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Next + Tailwind v4 ✅</h1>
        <p className="opacity-80">
          Jeśli widzisz spacing/border/typografię — działa.
        </p>
      </div>
    </main>
  );
}
