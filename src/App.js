import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'animate.css';

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const SplashPage = React.lazy(() => import('./pages/SplashPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const MainPage = React.lazy(() => import('./pages/MainPage'));
const MyPlacePage = React.lazy(() => import('./pages/MyPlacePage'));
const QuestionPage = React.lazy(() => import('./pages/QuestionPage'));
const MyInfoPage = React.lazy(() => import('./pages/MyInfoPage'));
const FAQPage = React.lazy(() => import('./pages/FAQPage'));
const TCPage = React.lazy(() => import('./pages/TCPage'));
const OnDemandPage = React.lazy(() => import('./pages/OnDemandPage'));


const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/place" element={<MyPlacePage />} />
          <Route path="/questions" element={<QuestionPage />} />
          <Route path="/info" element={<MyInfoPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/tc" element={<TCPage />} />
          <Route path="/on-demand" element={<OnDemandPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
