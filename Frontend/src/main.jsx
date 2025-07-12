// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css'; // Tailwind or global styles
// import App from './App.jsx';
// import { AuthProvider } from './context/AuthContext';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </StrictMode>
// );

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

