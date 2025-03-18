import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './components/todo/todo.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <div className="container">
    <h1>Strives</h1>
    <StrictMode>
      <App />
    </StrictMode>
  </div>
);

//Profil: credits
//        gained:  / lost:

// HABITS      TODAY TO DO (Link notion)   REWARDS
//                                         are u okay to exchanges your X credits for this item ?