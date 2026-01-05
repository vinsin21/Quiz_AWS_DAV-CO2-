
import React from 'react';
import * as RouterDom from 'react-router-dom';
const { useNavigate, Link } = RouterDom as any;
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Target, 
  Clock, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Hammer, 
  Activity,
  Flame,
  CheckCircle2,
  Info,
  Cloud,
  Database,
  Terminal,
  Cpu,
  Lock,
  Play,
  ExternalLink
} from 'lucide-react';

const MotionDiv = motion.div as any;

const FloatingIcon = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <MotionDiv
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [0, -20, 0],
      opacity: [0.05, 0.15, 0.05],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      duration: 6, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut" 
    }}
    className={`absolute pointer-events-none ${className}`}
  >
    {children}
  </MotionDiv>
);

const CurriculumPage: React.FC = () => {
  const navigate = useNavigate();

  const domains = [
    { title: "Development with AWS Services", weight: 32, icon: <Hammer size={20} />, sub: "Lambda, API Gateway, DynamoDB, S3, Messaging (SQS, SNS)" },
    { title: "Security", weight: 26, icon: <ShieldCheck size={20} />, sub: "IAM, KMS, Encryption, Cognito, Secrets Manager" },
    { title: "Deployment", weight: 24, icon: <Zap size={20} />, sub: "CI/CD, Code Suite, Beanstalk, Blue-Green/Canary Patterns" },
    { title: "Troubleshooting & Optimization", weight: 18, icon: <Activity size={20} />, sub: "CloudWatch, X-Ray, Debugging Failure Patterns" },
  ];

  const roadmap = [
    { day: "Day 1", title: "Diagnostic & Gaps", desc: "Take a full 50-question mock test to identify weak domains immediately." },
    { day: "Day 2-3", title: "Core Compute & Storage", desc: "Deep dive into Lambda, DynamoDB, and S3. Master CRUD operations via SDK." },
    { day: "Day 4", title: "Security & Integration", desc: "Understand IAM Policies, KMS encryption envelopes, and SQS/SNS fan-out." },
    { day: "Day 5", title: "Deployment Mastery", desc: "Focus on buildspec.yml and appspec.yml. Study deployment types for Beanstalk." },
    { day: "Day 6", title: "Observability", desc: "Practice reading CloudWatch metrics and understanding X-Ray segment traces." },
    { day: "Day 7", title: "Final Polish", desc: "Review all failed questions and take the final 87-question comprehensive exam." },
  ];

  // Clean URLs for better compatibility
  const youtubeEmbedUrl = "https://www.youtube-nocookie.com/embed/Bf5Wcfh9cRM?start=648&rel=0";
  const youtubeExternalUrl = "https://www.youtube.com/watch?v=Bf5Wcfh9cRM&t=648s";

  return (
    <div className="min-h-screen bg-black pb-24 selection:bg-orange-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-lg border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center text-gray-400 hover:text-white transition-colors gap-2 font-medium">
            <ArrowLeft size={18} />
            Back to Home
          </button>
          <div className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
            DVA-C02 Exam Guide
          </div>
        </div>
      </nav>

      {/* Hero Section with Embedded Video */}
      <section className="relative px-6 py-12 md:py-24 overflow-hidden">
        {/* Floating Background Icons */}
        <FloatingIcon delay={0} className="top-10 left-[10%] text-orange-500"><Cloud size={80} /></FloatingIcon>
        <FloatingIcon delay={1} className="bottom-20 right-[15%] text-yellow-500"><Database size={60} /></FloatingIcon>
        <FloatingIcon delay={2} className="top-40 right-[10%] text-orange-400"><Terminal size={70} /></FloatingIcon>
        <FloatingIcon delay={1.5} className="bottom-10 left-[20%] text-blue-500"><Lock size={50} /></FloatingIcon>
        <FloatingIcon delay={2.5} className="top-20 left-[40%] text-orange-600"><Cpu size={40} /></FloatingIcon>

        <div className="mx-auto max-w-5xl relative z-10">
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 flex flex-col items-center"
          >
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-orange-400 uppercase tracking-widest backdrop-blur-sm">
              <Play size={12} className="fill-orange-400" />
              Complete Certification Roadmap
            </div>

            {/* Video Container with Premium Styling */}
            <div className="w-full relative group">
              {/* Outer Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/30 via-yellow-500/20 to-orange-600/30 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000" />
              
              <div className="relative aspect-video w-full rounded-[2rem] border border-white/10 bg-zinc-900 overflow-hidden shadow-2xl">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={youtubeEmbedUrl}
                  title="AWS Certified Developer Associate Roadmap"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Subtle tech accents */}
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-orange-500/40 rounded-tr-2xl pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-orange-500/40 rounded-bl-2xl pointer-events-none" />
            </div>

            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">Master the DVA-C02 Domain</h2>
                <p className="text-sm text-gray-500 font-medium">Watch the expert breakdown of everything you need to pass first attempt.</p>
              </div>
              
              <a 
                href={youtubeExternalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600/10 border border-red-600/20 text-red-500 hover:bg-red-600/20 transition-all font-bold text-sm group"
              >
                <ExternalLink size={16} />
                If video doesn't play, watch on YouTube
              </a>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Domains Section */}
      <section className="px-6 mb-32">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">What the Exam Actually Tests</h2>
            <p className="text-gray-400">The exam focuses on 4 core domains. Higher weight = more questions.</p>
          </div>

          <div className="grid gap-6">
            {domains.map((domain, i) => (
              <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20">
                      {domain.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{domain.title}</h4>
                      <p className="text-sm text-gray-500">{domain.sub}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-white/20">{domain.weight}%</div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <MotionDiv 
                    initial={{ width: 0 }}
                    animate={{ width: `${domain.weight}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Tiers */}
      <section className="px-6 mb-32 bg-white/[0.02] py-24 border-y border-white/5">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Focus Areas — Prioritized by Impact</h2>
            <p className="text-gray-400">Don’t study everything equally. Focus on the high-frequency services first.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div className="p-8 rounded-3xl border border-orange-500/30 bg-orange-500/5 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-orange-500/20 blur-3xl rounded-full" />
              <div className="space-y-6 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500 text-black text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/40">
                  <Flame size={12} fill="black" />
                  Tier 1 — Must-Know
                </div>
                <h4 className="text-xl font-bold">Deep Understanding</h4>
                <div className="flex flex-wrap gap-2">
                  {["Lambda", "API Gateway", "DynamoDB", "S3", "SQS", "SNS", "IAM"].map(s => (
                    <span key={s} className="px-3 py-1 bg-black/40 rounded-lg text-xs border border-white/5 text-orange-200">{s}</span>
                  ))}
                </div>
                <p className="text-sm text-orange-200/60 leading-relaxed">
                  Expect multiple questions from these. Master the fundamentals, integration patterns, and limits.
                </p>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500 text-black text-[10px] font-black uppercase tracking-widest">
                Tier 2 — Standard
              </div>
              <h4 className="text-xl font-bold">Working Knowledge</h4>
              <div className="flex flex-wrap gap-2 text-gray-400">
                 {["Cognito", "KMS", "Secrets Manager", "CloudWatch", "X-Ray", "CodeSuite", "SAM", "Step Functions"].map(s => (
                  <span key={s} className="px-3 py-1 bg-black/20 rounded-lg text-xs border border-white/5">{s}</span>
                ))}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Know when to use them and common integration patterns with Tier 1 services.
              </p>
            </div>

            {/* Tier 3 */}
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-700 text-gray-300 text-[10px] font-black uppercase tracking-widest">
                Tier 3 — Awareness
              </div>
              <h4 className="text-xl font-bold">Concept Level</h4>
              <div className="flex flex-wrap gap-2 text-gray-500">
                 {["Kinesis", "Amplify", "AppSync", "ElastiCache", "EventBridge"].map(s => (
                  <span key={s} className="px-3 py-1 bg-black/10 rounded-lg text-xs border border-white/5">{s}</span>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                1–2 questions max. Don’t overspend time here. Know the high-level use case.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl space-y-16">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">7-Day Structured Preparation System</h2>
            <p className="text-gray-400 italic font-medium">Identify gaps early. Drill into domains. Polish to perfection.</p>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {roadmap.map((item, i) => (
              <MotionDiv 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-orange-500/50 bg-black text-orange-500 shadow-xl shadow-orange-500/10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                   <span className="text-[10px] font-black">{i + 1}</span>
                </div>
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-white/5 bg-white/5 group-hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-orange-500 font-black uppercase text-[10px] tracking-widest">{item.day}</span>
                    <CheckCircle2 size={14} className="text-white/10 group-hover:text-green-500/50 transition-colors" />
                  </div>
                  <h5 className="font-bold text-lg mb-2">{item.title}</h5>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </MotionDiv>
            ))}
          </div>

          <div className="pt-12 flex justify-center">
             <div className="p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 max-w-2xl text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Info size={24} />
                </div>
                <h4 className="text-xl font-bold">Pro-Tip for Success</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The DVA-C02 exam is 70% scenario-based. Don't just memorize service names; understand <strong>why</strong> a specific service is chosen over another for cost, performance, or operational overhead.
                </p>
                <Link to="/tests" className="inline-block pt-4 text-blue-400 font-bold hover:underline">
                   Ready to begin? Start with Mock Test 1
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CurriculumPage;
