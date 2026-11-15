// Temporary placeholder entry point.
// The original Ledgerline source (src/) was not included in the repository upload.
// Replace this folder with the real application source when it is pushed.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function Placeholder() {
  return (
    <main className="min-h-screen bg-paper text-ink font-sans flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Ledgerline</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold">Markets, Crypto &amp; Business</h1>
        <p className="mt-4 text-lg text-ink/70">We're getting things ready. Check back soon.</p>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Placeholder />
  </StrictMode>,
);
