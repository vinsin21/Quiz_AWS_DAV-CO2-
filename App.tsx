
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MockTestList from './pages/MockTestList';
import TestDetails from './pages/TestDetails';
import QuizPage from './pages/QuizPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tests" element={<MockTestList />} />
          <Route path="/tests/:testId" element={<TestDetails />} />
          <Route path="/quiz/:testId" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
