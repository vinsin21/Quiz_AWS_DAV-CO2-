
import React from 'react';
// Fix for react-router-dom errors by using a type-casting import workaround
import * as RouterDom from "react-router-dom";
const { useParams, useNavigate, Link } = RouterDom as any;
import { mockTests } from '../data/mockTests.ts';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, HelpCircle, ShieldCheck, AlertCircle } from 'lucide-react';

// Fix for framer-motion property errors
const MotionDiv = motion.div as any;

const TestDetails: React.FC = () => {
  // Fix: Removed generic type argument from untyped useParams call to resolve TypeScript error
  const { testId } = useParams() as { testId: string };
  const navigate = useNavigate();
  const test = mockTests.find(t => t.id === testId);

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Test not found</h2>
          <Link to="/tests" className="text-orange-400 hover:underline">Back to test list</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-6 md:py-12 px-6 flex flex-col justify-center overflow-hidden">
      <div className="mx-auto w-full max-w-3xl">
        <Link 
          to="/tests" 
          className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 md:mb-12 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to list
        </Link>

        <MotionDiv
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-12 backdrop-blur-xl space-y-6 md:space-y-8"
        >
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {test.title}
            </h1>
            <p className="text-sm md:text-lg text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none">
              {test.description}
            </p>
          </div>

          <div className="flex flex-row md:grid md:grid-cols-2 gap-3 md:gap-4">
            <div className="flex-1 flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5">
              <Clock className="text-orange-400 w-5 h-5 md:w-6 md:h-6 shrink-0" />
              <div>
                <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-bold">Time Limit</p>
                <p className="text-sm md:text-base font-semibold">{test.durationMinutes}m</p>
              </div>
            </div>
            <div className="flex-1 flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5">
              <HelpCircle className="text-blue-400 w-5 h-5 md:w-6 md:h-6 shrink-0" />
              <div>
                <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-bold">Questions</p>
                <p className="text-sm md:text-base font-semibold">{test.questionIds.length}</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 gap-4">
            <ShieldCheck className="text-blue-400 shrink-0" />
            <div className="text-sm text-blue-100/80 leading-relaxed">
              <p className="font-semibold text-blue-400 mb-1">Exam Rules</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Immediate feedback will be shown after each answer.</li>
                <li>Multiple correct questions require selecting all correct answers.</li>
                <li>You can navigate between questions freely.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate(`/quiz/${test.id}`)}
              className="w-full py-4 md:py-6 rounded-2xl bg-white text-black font-bold text-lg md:text-xl hover:bg-gray-200 transition-colors shadow-xl shadow-white/10"
            >
              Start Exam Now
            </button>

            <div className="flex items-center justify-center space-x-2 text-[10px] md:text-xs text-gray-500">
              <AlertCircle size={14} className="shrink-0" />
              <span>Progress is not saved if you leave the browser tab.</span>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default TestDetails;
