
import React, { useState, useMemo, useEffect, useCallback } from 'react';
// Fix for react-router-dom errors by using a type-casting import workaround
import * as RouterDom from "react-router-dom";
const { useParams, useNavigate } = RouterDom as any;
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, HelpCircle, XCircle, Trophy, Home, Play } from 'lucide-react';
import { mockTests } from '../data/mockTests.ts';
import { Question } from '../types.ts';
import { questionsData } from '../data/questions.ts';

// Fix for framer-motion property errors
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;
const AnyAnimatePresence = AnimatePresence as any;

const QuizPage: React.FC = () => {
  // Fix: Removed generic type argument from untyped useParams call to resolve TypeScript error
  const { testId } = useParams() as { testId: string };
  const navigate = useNavigate();
  
  const test = mockTests.find(t => t.id === testId);
  const questions: Question[] = useMemo(() => {
    if (!test) return [];
    const all = questionsData;
    return test.questionIds.map(id => {
      const q = all.find(item => item.id === id);
      if (q) return q;
      return {
        id,
        question: `Placeholder question for AWS Domain ${id}?`,
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correct_answers: [0],
        multiple_correct: false
      };
    });
  }, [test]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState<Record<number, { selected: number[], correct: boolean }>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleQuit = useCallback(() => {
    setIsFinished(false);
    setShowSummary(true);
  }, []);

  // Intercept Browser/Hardware Back Button
  useEffect(() => {
    // Only intercept if we are currently in the quiz and not already showing summary
    if (!showSummary) {
      // Push a dummy state to history so the first "back" doesn't leave the page
      window.history.pushState({ quizActive: true }, '');

      const handlePopState = (event: PopStateEvent) => {
        // If the user tries to go back, show the summary instead of leaving
        handleQuit();
        // Re-push state to keep the user "locked" into the quiz until they explicitly click Home/Exit
        window.history.pushState({ quizActive: true }, '');
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [showSummary, handleQuit]);

  const handleOptionToggle = (index: number) => {
    if (isAnswered) return;

    if (currentQuestion.multiple_correct) {
      setSelectedIndices(prev => 
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setSelectedIndices([index]);
      submitAnswer([index]);
    }
  };

  const submitAnswer = (finalSelection?: number[]) => {
    const selection = finalSelection || selectedIndices;
    if (selection.length === 0) return;

    const correctIndices = currentQuestion.correct_answers;
    const isCorrect = selection.length === correctIndices.length && 
                      selection.every(i => correctIndices.includes(i));
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: { selected: selection, correct: isCorrect }
    }));
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      resetQuestionState(nextIdx);
    } else {
      setIsFinished(true);
      setShowSummary(true);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      resetQuestionState(prevIdx);
    }
  };

  const resetQuestionState = (index: number) => {
    const questionId = questions[index].id;
    const saved = answers[questionId];
    if (saved) {
      setSelectedIndices(saved.selected);
      setIsAnswered(true);
    } else {
      setSelectedIndices([]);
      setIsAnswered(false);
    }
  };

  if (showSummary) {
    const attemptedCount = Object.keys(answers).length;
    const correctCount = Object.values(answers).filter(a => (a as { correct: boolean }).correct).length;
    const score = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-center space-y-8"
        >
          <div className="mx-auto w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center">
            {isFinished ? (
              <Trophy className="text-orange-500 w-10 h-10" />
            ) : (
              <HelpCircle className="text-orange-500 w-10 h-10" />
            )}
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">{isFinished ? "Test Summary" : "Test Paused"}</h2>
            <p className="text-gray-400">
              {isFinished 
                ? "Great effort! Keep practicing to master AWS." 
                : "You haven't finished the test yet. Would you like to continue?"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-2xl font-bold text-white">{attemptedCount}/{questions.length}</p>
              <p className="text-xs text-gray-500 uppercase font-bold">Attempted</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-2xl font-bold text-green-400">{correctCount}</p>
              <p className="text-xs text-gray-500 uppercase font-bold">Correct</p>
            </div>
          </div>

          <div className="relative pt-4">
             <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <MotionDiv 
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  className="h-full bg-orange-500"
                />
             </div>
             <p className="text-right text-xs mt-2 text-gray-500">Current Progress: {score}%</p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={isFinished ? () => navigate('/tests') : () => setShowSummary(false)}
              className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors inline-flex items-center justify-center"
            >
              {!isFinished && <Play className="mr-2 h-4 w-4 fill-current" />}
              {isFinished ? "Try Another Test" : "Resume Test"}
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-4 rounded-xl border border-white/10 bg-white/5 font-bold hover:bg-white/10 transition-colors inline-flex items-center justify-center text-gray-400"
            >
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </button>
          </div>
        </MotionDiv>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleQuit}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400"
              title="Pause Test"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold truncate max-w-[150px] sm:max-w-none">{test?.title}</h3>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-black">
                <span>Question {currentIndex + 1} of {questions.length}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-xs font-mono text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              {Math.floor((currentIndex + 1) / questions.length * 100)}% Progress
            </div>
            <button 
              onClick={handleQuit}
              className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
            >
              End Test
            </button>
          </div>
        </div>
        <div className="h-1 w-full bg-white/5">
           <MotionDiv 
             className="h-full bg-orange-500"
             animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
           />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <AnyAnimatePresence mode="wait">
          <MotionDiv
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <HelpCircle size={18} />
                </div>
                <h2 className="text-xl md:text-2xl font-medium leading-relaxed text-gray-100">
                  {currentQuestion.question}
                </h2>
              </div>

              {currentQuestion.multiple_correct && (
                <div className="ml-12 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-bold uppercase tracking-widest">
                  Multiple Choices Required
                </div>
              )}

              <div className="grid gap-3 ml-0 sm:ml-12">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedIndices.includes(idx);
                  const isCorrect = currentQuestion.correct_answers.includes(idx);
                  
                  let stateStyle = "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20";
                  if (isAnswered) {
                    if (isCorrect) {
                      stateStyle = "border-green-500/50 bg-green-500/10 text-green-200";
                    } else if (isSelected) {
                      stateStyle = "border-red-500/50 bg-red-500/10 text-red-200";
                    } else {
                      stateStyle = "border-white/5 bg-white/5 opacity-50";
                    }
                  } else if (isSelected) {
                    stateStyle = "border-orange-500 bg-orange-500/10 text-orange-200";
                  }

                  return (
                    <MotionButton
                      key={idx}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleOptionToggle(idx)}
                      disabled={isAnswered}
                      className={`relative flex items-center text-left p-4 md:p-5 rounded-2xl border transition-all group ${stateStyle}`}
                    >
                      <div className="mr-4 shrink-0">
                        {isAnswered ? (
                          isCorrect ? <CheckCircle2 className="text-green-500" size={20} /> : 
                          isSelected ? <XCircle className="text-red-500" size={20} /> :
                          <Circle className="text-gray-600" size={20} />
                        ) : (
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-orange-500' : 'border-gray-600 group-hover:border-gray-400'}`}>
                             {isSelected && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />}
                          </div>
                        )}
                      </div>
                      <span className="text-sm md:text-base font-medium">{option}</span>
                    </MotionButton>
                  );
                })}
              </div>
            </div>

            <div className="ml-0 sm:ml-12 pt-8 flex flex-col sm:flex-row items-center gap-4">
              {!isAnswered && currentQuestion.multiple_correct && (
                <button
                  onClick={() => submitAnswer()}
                  disabled={selectedIndices.length === 0}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Check Answers
                </button>
              )}

              <div className="w-full flex justify-between items-center gap-4">
                <button
                  onClick={prevQuestion}
                  disabled={currentIndex === 0}
                  className="flex-1 sm:flex-none px-6 py-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-0 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={18} />
                  <span>Previous</span>
                </button>

                <button
                  onClick={nextQuestion}
                  disabled={!isAnswered}
                  className="flex-1 sm:flex-none px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <span>{currentIndex === questions.length - 1 ? 'Finish Exam' : 'Next'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </MotionDiv>
        </AnyAnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;
