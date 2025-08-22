import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/inter-tight/400.css';
import '@fontsource/inter-tight/500.css';
import '@fontsource/inter-tight/600.css';
import '@fontsource/inter-tight/700.css';
import '@fontsource/inconsolata/400.css';
import '@fontsource/inconsolata/500.css';
import '@fontsource/inconsolata/600.css';
import '@fontsource/inconsolata/700.css';
import './index.css';

import { AppRouter } from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
