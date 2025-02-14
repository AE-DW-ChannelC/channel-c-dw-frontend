import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import "./App.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TokenService from "./services/token.service";
import LoadingFullscreen from "./components/LoadingFullscreen";

const SplashPage = React.lazy(() => import("./pages/SplashPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const MainPage = React.lazy(() => import("./pages/MainPage"));
const MyPlacePage = React.lazy(() => import("./pages/MyPlacePage"));
const QuestionPage = React.lazy(() => import("./pages/QuestionPage"));
const MyInfoPage = React.lazy(() => import("./pages/MyInfoPage"));
const FAQPage = React.lazy(() => import("./pages/FAQPage"));
const TCPage = React.lazy(() => import("./pages/TCPage"));
const OnDemandPage = React.lazy(() => import("./pages/OnDemandPage"));

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    setUserLoggedIn(!!TokenService.getTokenDetails());
  }, []);

  return (
    <Router>
      <React.Suspense fallback={<LoadingFullscreen loading={true} />}>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route
            path="/login"
            element={
              userLoggedIn ? <Navigate to="/home" replace /> : <LoginPage />
            }
          />
          <Route
            path="/home"
            element={
              userLoggedIn ? <MainPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/place"
            element={
              userLoggedIn ? <MyPlacePage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/questions"
            element={
              userLoggedIn ? <QuestionPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/info"
            element={
              userLoggedIn ? <MyInfoPage /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/tc" element={<TCPage />} />
          <Route path="/on-demand" element={<OnDemandPage />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
};

export default App;
