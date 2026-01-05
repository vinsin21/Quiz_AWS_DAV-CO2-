
import React from 'react';
// Fix for react-router-dom errors by using a type-casting import workaround
import * as RouterDom from 'react-router-dom';
const { HashRouter, Routes, Route } = RouterDom as any;
import LandingPage from './pages/LandingPage.tsx';
import MockTestList from './pages/MockTestList.tsx';
import TestDetails from './pages/TestDetails.tsx';
import QuizPage from './pages/QuizPage.tsx';

const Router = HashRouter;

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
