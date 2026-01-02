
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockTests } from '../data/mockTests';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, HelpCircle, ShieldCheck, AlertCircle } from 'lucide-react';

const TestDetails: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
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
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="mx-auto max-w-3xl">
        <Link 
          to="/tests" 
          className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-12 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to list
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {test.title}
            </h1>
            <p className="text-lg text-gray-400">
              {test.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <Clock className="text-orange-400" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Time Limit</p>
                <p className="font-semibold">{test.durationMinutes} Minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <HelpCircle className="text-blue-400" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Total Questions</p>
                <p className="font-semibold">{test.questionIds.length} MCQs</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex gap-4">
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

          <button
            onClick={() => navigate(`/quiz/${test.id}`)}
            className="w-full py-6 rounded-2xl bg-white text-black font-bold text-xl hover:bg-gray-200 transition-colors shadow-xl shadow-white/10"
          >
            Start Exam Now
          </button>

          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <AlertCircle size={14} />
            <span>Progress is not saved if you leave the browser tab.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestDetails;
