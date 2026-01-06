
import React, { useState, useMemo, useRef, useEffect } from 'react';
// Fix for react-router-dom useNavigate error
import * as RouterDom from "react-router-dom";
const { useNavigate } = RouterDom as any;
import { Card } from '../components/ui/Card.tsx';
import { mockTests } from '../data/mockTests.ts';
import { 
  Cloud, 
  Shield, 
  Database, 
  LayoutPanelTop, 
  Filter, 
  ChevronDown, 
  Check, 
  ArrowLeft, 
  Code, 
  Zap, 
  Layers 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for framer-motion property errors
const MotionDiv = motion.div as any;
const MotionP = motion.p as any;
const AnyAnimatePresence = AnimatePresence as any;

// Updated props to make children optional for better JSX child handling
const FloatingIcon = ({ children, delay = 0, className = "" }: { children?: React.ReactNode, delay?: number, className?: string }) => (
  <MotionDiv
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [0, -15, 0],
      opacity: [0.03, 0.1, 0.03],
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut" 
    }}
    className={`absolute pointer-events-none ${className}`}
  >
    {children}
  </MotionDiv>
);

type FilterTopic = 'all' | 'lambda' | 'dynamodb' | 'iam' | 's3';

interface TopicOption {
  value: FilterTopic;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const TOPICS: TopicOption[] = [
  { value: 'all', label: 'All General Exams', icon: <Filter size={16} />, color: 'text-gray-400' },
  { value: 'lambda', label: 'AWS Lambda', icon: <LayoutPanelTop size={16} />, color: 'text-orange-500' },
  { value: 'dynamodb', label: 'DynamoDB', icon: <Database size={16} />, color: 'text-blue-400' },
  { value: 'iam', label: 'IAM Security', icon: <Shield size={16} />, color: 'text-red-400' },
  { value: 's3', label: 'Amazon S3', icon: <Cloud size={16} />, color: 'text-green-400' },
];

const MockTestList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<FilterTopic>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (id: string) => {
    if (id.includes('lambda')) return <LayoutPanelTop size={32} className="text-orange-500" />;
    if (id.includes('dynamodb') || id.includes('database')) return <Database size={32} className="text-blue-400" />;
    if (id.includes('iam') || id.includes('security')) return <Shield size={32} className="text-red-400" />;
    if (id.includes('s3')) return <Cloud size={32} className="text-green-400" />;
    return <Cloud size={32} />;
  };

  const filteredTests = useMemo(() => {
    if (selectedTopic === 'all') {
      return mockTests.filter(t => !t.topic);
    }
    return mockTests.filter(t => t.topic === selectedTopic);
  }, [selectedTopic]);

  const activeTopic = TOPICS.find(t => t.value === selectedTopic) || TOPICS[0];

  return (
    <div className="min-h-screen bg-black pb-16 selection:bg-orange-500/30">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-lg border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center text-gray-400 hover:text-white transition-colors gap-2 font-medium">
            <ArrowLeft size={18} />
            Back to Home
          </button>
          <div className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
            Practice Exams
          </div>
        </div>
      </nav>

      <div className="relative mx-auto max-w-7xl px-6 pt-20">
        {/* Isolated Floating Icons Layer with its own overflow control */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <FloatingIcon delay={0.5} className="top-10 left-[5%] text-blue-500"><Zap size={60} /></FloatingIcon>
          <FloatingIcon delay={1.5} className="top-40 right-[5%] text-orange-500"><Code size={80} /></FloatingIcon>
          <FloatingIcon delay={2.5} className="bottom-0 left-[15%] text-zinc-600"><Layers size={50} /></FloatingIcon>
        </div>

        {/* Hero Section - Increased Z-index to z-30 */}
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-30 mb-12 space-y-6 text-center"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white sm:text-6xl tracking-tight">Select Your Test</h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
              Choose a general simulation or focus on specific AWS services to master individual domains.
            </p>
          </div>

          {/* Custom Animated Dropdown Filter */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <div className="relative w-full max-w-[280px]" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between bg-white/5 border border-white/10 text-white rounded-2xl py-3 px-5 hover:bg-white/10 hover:border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              >
                <div className="flex items-center gap-3">
                  <span className={activeTopic.color}>{activeTopic.icon}</span>
                  <span className="font-semibold">{activeTopic.label}</span>
                </div>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-500"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnyAnimatePresence>
                {isDropdownOpen && (
                  <MotionDiv
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 w-full mt-2 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[60] overflow-hidden"
                  >
                    {TOPICS.map((topic) => (
                      <button
                        key={topic.value}
                        onClick={() => {
                          setSelectedTopic(topic.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                          selectedTopic === topic.value 
                          ? 'bg-orange-500/10 text-white' 
                          : 'text-gray-400 hover:bg-white/5 hover:text-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={topic.color}>{topic.icon}</span>
                          <span className="font-medium">{topic.label}</span>
                        </div>
                        {selectedTopic === topic.value && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <Check size={16} className="text-orange-500" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </MotionDiv>
                )}
              </AnyAnimatePresence>
            </div>
            
            <AnyAnimatePresence mode="wait">
              <MotionP 
                key={selectedTopic}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/80"
              >
                {selectedTopic === 'all' ? 'Core Curriculum' : `${selectedTopic} Domain Mastery`}
              </MotionP>
            </AnyAnimatePresence>
          </div>
        </MotionDiv>

        {/* Cards Grid - Lower Z-index to z-10 */}
        <MotionDiv 
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10"
        >
          <AnyAnimatePresence mode="popLayout">
            {filteredTests.map((test) => (
              <MotionDiv
                key={test.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  title={test.title}
                  description={test.description}
                  icon={getIcon(test.id)}
                  onClick={() => navigate(`/tests/${test.id}`)}
                  footer={
                    <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {test.questionIds.length} MCQs
                      </span>
                      <span className="bg-white/5 px-2 py-1 rounded-md">{test.durationMinutes}m</span>
                    </div>
                  }
                />
              </MotionDiv>
            ))}
          </AnyAnimatePresence>
        </MotionDiv>

        {filteredTests.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <p className="text-gray-500 italic font-medium">No specialized tests found for this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockTestList;
