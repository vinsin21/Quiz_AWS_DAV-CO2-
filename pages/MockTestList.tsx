
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { mockTests } from '../data/mockTests';
import { Cloud, Shield, Database, LayoutPanelTop } from 'lucide-react';
import { motion } from 'framer-motion';

const MockTestList: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (id: string) => {
    if (id.includes('fundamentals')) return <LayoutPanelTop size={32} />;
    if (id.includes('database')) return <Database size={32} />;
    if (id.includes('security')) return <Shield size={32} />;
    return <Cloud size={32} />;
  };

  return (
    <div className="min-h-screen bg-black py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 space-y-4 text-center"
        >
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Practice Exams</h1>
          <p className="text-lg text-gray-400">Choose a focused module or a full-length simulation to test your AWS expertise.</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                title={test.title}
                description={test.description}
                icon={getIcon(test.id)}
                onClick={() => navigate(`/tests/${test.id}`)}
                footer={
                  <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                    <span>{test.questionIds.length} Questions</span>
                    <span>{test.durationMinutes} Minutes</span>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MockTestList;
