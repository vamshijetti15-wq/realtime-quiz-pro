import { ArrowLeft } from "lucide-react";

interface Poll {
  id: string;
  question: string;
  options: string[];
  timeLimit: number;
  createdAt: Date;
  responses: { [optionIndex: number]: string[] };
  isActive: boolean;
}

interface PollHistoryProps {
  polls: Poll[];
  onBack: () => void;
}

const PollHistory = ({ polls, onBack }: PollHistoryProps) => {
  const getTotalResponses = (poll: Poll) => {
    return Object.values(poll.responses).reduce((total, names) => total + names.length, 0);
  };

  const getOptionPercentage = (poll: Poll, optionIndex: number) => {
    const total = getTotalResponses(poll);
    if (total === 0) return 0;
    const responses = poll.responses[optionIndex]?.length || 0;
    return Math.round((responses / total) * 100);
  };

  const mockHistoryPolls = [
    {
      id: '1',
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
      timeLimit: 60,
      createdAt: new Date('2024-01-15'),
      responses: {
        0: ['Rahul Balaji', 'Jai Adarsh'],
        1: ['Raghunandan Pardeshi'],
        2: [],
        3: ['Adithya Shankar']
      },
      isActive: false
    },
    {
      id: '2',
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Yes', 'No'],
      timeLimit: 60,
      createdAt: new Date('2024-01-14'),
      responses: {
        0: ['Rahul Balaji', 'Jai Adarsh', 'Adithya Shankar'],
        1: [],
        2: ['Raghunandan Pardeshi']
      },
      isActive: false
    }
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-poll-text mb-2">View Poll History</h1>
          <p className="text-poll-text-light">
            Review past polling sessions and their results.
          </p>
        </div>

        <div className="space-y-8">
          {mockHistoryPolls.map((poll, pollIndex) => (
            <div key={poll.id} className="poll-card p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-poll-text">
                    Question {pollIndex + 1}
                  </h3>
                  <span className="text-sm text-poll-text-light">
                    {poll.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-poll-text mb-4">
                  {poll.question}
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                {poll.options.map((option, index) => {
                  const percentage = getOptionPercentage(poll, index);
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
                      <div className="w-full bg-poll-border rounded-full h-6">
                        <div 
                          className="poll-results-bar"
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="text-xs">{responses} votes</span>
                          <span className="text-xs">{percentage}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-poll-border">
                <div className="flex items-center justify-between text-sm text-poll-text-light">
                  <span>Total Responses: {getTotalResponses(poll)}</span>
                  <span>Duration: {poll.timeLimit}s</span>
                </div>
              </div>
            </div>
          ))}

          {polls.length === 0 && mockHistoryPolls.length === 0 && (
            <div className="poll-card p-12 text-center">
              <div className="text-poll-text-light mb-4">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-lg font-medium text-poll-text mb-2">No Poll History</h3>
                <p>You haven't created any polls yet. Start by creating your first poll!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollHistory;