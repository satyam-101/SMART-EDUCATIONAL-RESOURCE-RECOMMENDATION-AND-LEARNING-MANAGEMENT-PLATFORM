import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import './index.css';

window.addEventListener('error', (event) => {
  console.error('[global-error]', event.error?.stack ?? event.message);
});
window.addEventListener('unhandledrejection', (event) => {
  console.error('[unhandled-rejection]', event.reason?.stack ?? event.reason);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <UIProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </UIProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
