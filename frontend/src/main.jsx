import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import ViewCode from './viewcode.jsx';
import LoginPage from './loginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/view/:id" element={<ViewCode />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
