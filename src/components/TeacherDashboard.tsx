import { useState, useEffect } from "react";
import { ArrowLeft, Plus, BarChart3, Clock, Users, History } from "lucide-react";
import PollCreation from "./PollCreation";
import PollResults from "./PollResults";
import PollHistory from "./PollHistory";

interface Poll {
  id: string;
  question: string;
  options: string[];
  timeLimit: number;
  createdAt: Date;
  responses: { [optionIndex: number]: string[] }; // optionIndex -> student names
  isActive: boolean;
}

interface TeacherDashboardProps {
  onBack: () => void;
}

const TeacherDashboard = ({ onBack }: TeacherDashboardProps) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'create' | 'results' | 'history'>('dashboard');
  const [polls, setPolls] = useState<Poll[]>([]);
  const [activePoll, setActivePoll] = useState<Poll | null>(null);
  const [students, setStudents] = useState<string[]>(["Rahul Balaji", "Raghunandan Pardeshi", "Jai Adarsh", "Adithya Shankar"]);

  // Mock data for demonstration
  useEffect(() => {
    const mockPolls: Poll[] = [
      {
        id: '1',
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        timeLimit: 60,
        createdAt: new Date(),
        responses: {
          0: ['Rahul Balaji', 'Jai Adarsh'],
          1: ['Raghunandan Pardeshi'],
          2: [],
          3: ['Adithya Shankar']
        },
        isActive: false
      }
    ];
    setPolls(mockPolls);
  }, []);

  const createPoll = (question: string, options: string[], timeLimit: number) => {
    const newPoll: Poll = {
      id: Date.now().toString(),
      question,
      options,
      timeLimit,
      createdAt: new Date(),
      responses: {},
      isActive: true
    };
    
    setPolls(prev => [...prev, newPoll]);
    setActivePoll(newPoll);
    setCurrentView('results');
  };

  const getTotalStudents = () => students.length;
  const getActiveResponses = () => {
    if (!activePoll) return 0;
    return Object.values(activePoll.responses).reduce((total, names) => total + names.length, 0);
  };

  if (currentView === 'create') {
    return <PollCreation onBack={() => setCurrentView('dashboard')} onCreatePoll={createPoll} />;
  }

  if (currentView === 'results' && activePoll) {
    return <PollResults poll={activePoll} onBack={() => setCurrentView('dashboard')} students={students} />;
  }

  if (currentView === 'history') {
    return <PollHistory polls={polls.filter(p => !p.isActive)} onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-poll-text-light hover:text-poll-purple transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Role Selection</span>
          </button>
          
          <div className="text-right">
            <h1 className="text-2xl font-bold text-poll-text">Teacher Dashboard</h1>
            <p className="text-poll-text-light">Manage your live polling sessions</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="poll-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-poll-text-light text-sm">Total Students</p>
                <p className="text-2xl font-bold text-poll-text">{getTotalStudents()}</p>
              </div>
              <Users className="w-8 h-8 text-poll-purple" />
            </div>
          </div>

          <div className="poll-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-poll-text-light text-sm">Active Responses</p>
                <p className="text-2xl font-bold text-poll-text">{getActiveResponses()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-poll-success" />
            </div>
          </div>

          <div className="poll-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-poll-text-light text-sm">Total Polls</p>
                <p className="text-2xl font-bold text-poll-text">{polls.length}</p>
              </div>
              <Clock className="w-8 h-8 text-poll-warning" />
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setCurrentView('create')}
            className="poll-card p-8 hover:shadow-lg transition-all duration-300 group text-left"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-poll-purple-light rounded-lg flex items-center justify-center group-hover:bg-poll-purple transition-colors">
                <Plus className="w-6 h-6 text-poll-purple group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-poll-text">Create New Poll</h3>
            </div>
            <p className="text-poll-text-light">
              Ask a new question and get real-time responses from your students.
            </p>
          </button>

          {activePoll ? (
            <button
              onClick={() => setCurrentView('results')}
              className="poll-card p-8 hover:shadow-lg transition-all duration-300 group text-left border-2 border-poll-purple"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-poll-purple rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-poll-text">View Live Results</h3>
              </div>
              <p className="text-poll-text-light mb-2">
                {activePoll.question}
              </p>
              <div className="text-sm text-poll-purple font-medium">
                {getActiveResponses()}/{getTotalStudents()} students responded
              </div>
            </button>
          ) : (
            <div className="poll-card p-8 opacity-50 text-left">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-400">No Active Poll</h3>
              </div>
              <p className="text-gray-400">
                Create a poll to see live results from your students.
              </p>
            </div>
          )}

          <button
            onClick={() => setCurrentView('history')}
            className="poll-card p-8 hover:shadow-lg transition-all duration-300 group text-left"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-poll-purple-light rounded-lg flex items-center justify-center group-hover:bg-poll-purple transition-colors">
                <History className="w-6 h-6 text-poll-purple group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-poll-text">View Poll History</h3>
            </div>
            <p className="text-poll-text-light">
              Review past polling sessions and their results.
            </p>
          </button>

          <div className="poll-card p-8 text-left">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-poll-purple-light rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-poll-purple" />
              </div>
              <h3 className="text-xl font-semibold text-poll-text">Connected Students</h3>
            </div>
            <div className="space-y-2">
              {students.map((student, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-poll-text-light">{student}</span>
                  <div className="w-2 h-2 bg-poll-success rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;