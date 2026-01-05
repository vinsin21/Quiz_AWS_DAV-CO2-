
import React, { useState, useMemo, useRef, useEffect } from 'react';
// Fix for react-router-dom useNavigate error
import * as RouterDom from "react-router-dom";
const { useNavigate } = RouterDom as any;
import { Card } from '../components/ui/Card.tsx';
import { mockTests } from '../data/mockTests.ts';
import { Cloud, Shield, Database, LayoutPanelTop, Filter, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for framer-motion property errors
const MotionDiv = motion.div as any;
const MotionP = motion.p as any;
const AnyAnimatePresence = AnimatePresence as any;

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
    <div className="min-h-screen bg-black py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 space-y-6 text-center"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Practice Exams</h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
              Select a general simulation or focus on specific AWS services to master individual domains.
            </p>
          </div>

          {/* Custom Animated Dropdown Filter */}
          <div className="flex flex-col items-center gap-4 pt-4 relative z-50">
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
                    className="absolute top-full left-0 w-full mt-2 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden"
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

        <MotionDiv 
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
