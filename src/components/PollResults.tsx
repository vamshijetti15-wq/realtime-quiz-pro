import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Users, MoreVertical } from "lucide-react";

interface Poll {
  id: string;
  question: string;
  options: string[];
  timeLimit: number;
  createdAt: Date;
  responses: { [optionIndex: number]: string[] };
  isActive: boolean;
}

interface PollResultsProps {
  poll: Poll;
  onBack: () => void;
  students: string[];
}

const PollResults = ({ poll, onBack, students }: PollResultsProps) => {
  const [timeRemaining, setTimeRemaining] = useState(poll.timeLimit);
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect(() => {
    if (poll.isActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [poll.isActive, timeRemaining]);

  const getTotalResponses = () => {
    return Object.values(poll.responses).reduce((total, names) => total + names.length, 0);
  };

  const getOptionPercentage = (optionIndex: number) => {
    const total = getTotalResponses();
    if (total === 0) return 0;
    const responses = poll.responses[optionIndex]?.length || 0;
    return Math.round((responses / total) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const participants = [
    "Rahul Balaji", "Raghunandan Pardeshi", "Jai Adarsh", "Adithya Shankar"
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-poll-text-light hover:text-poll-purple transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Results Panel */}
          <div className="lg:col-span-2">
            <div className="poll-card p-8">
              {poll.isActive && (
                <div className="mb-6 p-4 bg-poll-purple-light/20 rounded-lg border border-poll-purple">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-poll-purple rounded-full animate-pulse"></div>
                      <span className="text-poll-purple font-medium text-sm">Live Poll Active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-poll-warning" />
                      <span className="text-poll-warning font-bold">{formatTime(timeRemaining)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium text-poll-text-light">Question 1</h2>
                <span className="text-sm text-poll-success font-medium">00:18</span>
              </div>

              <h1 className="text-xl font-bold text-poll-text mb-8">
                {poll.question}
              </h1>

              <div className="space-y-4">
                {poll.options.map((option, index) => {
                  const percentage = getOptionPercentage(index);
                  const responses = poll.responses[index]?.length || 0;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-poll-purple rounded-full"></div>
                          <span className="text-poll-text font-medium">{option}</span>
                        </div>
                        <span className="text-poll-text font-bold">{percentage}%</span>
                      </div>
                      <div className="w-full bg-poll-border rounded-full h-8">
                        <div 
                          className="poll-results-bar"
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="text-sm">{responses} votes</span>
                          <span className="text-sm">{percentage}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-poll-border">
                <button className="poll-button-primary w-full">
                  + Ask a new question
                </button>
              </div>
            </div>
          </div>

          {/* Participants Panel */}
          <div className="space-y-6">
            <div className="poll-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-poll-text">Live Responses</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-poll-success rounded-full"></div>
                  <span className="text-sm text-poll-text-light">
                    {getTotalResponses()}/{students.length}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {participants.map((participant, index) => {
                  const hasResponded = index < getTotalResponses();
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-poll-purple-light rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-poll-purple">
                            {participant.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm text-poll-text">{participant}</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        hasResponded ? 'bg-poll-success' : 'bg-poll-border'
                      }`}></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="poll-card p-6">
              <h3 className="font-semibold text-poll-text mb-4">Poll Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-poll-text-light">Total Responses</span>
                  <span className="font-medium">{getTotalResponses()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-poll-text-light">Response Rate</span>
                  <span className="font-medium">
                    {Math.round((getTotalResponses() / students.length) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-poll-text-light">Time Elapsed</span>
                  <span className="font-medium">{formatTime(poll.timeLimit - timeRemaining)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollResults;