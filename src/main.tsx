import "@fontsource/nunito"; // Defaults to weight 400
import "@fontsource/nunito/400-italic.css"; // Specify weight and style
import "@fontsource/nunito/400.css"; // Specify weight
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
