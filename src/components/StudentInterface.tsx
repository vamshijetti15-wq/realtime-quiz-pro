import { useState, useEffect } from "react";
import { ArrowLeft, Clock, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Poll {
  id: string;
  question: string;
  options: string[];
  timeLimit: number;
  timeRemaining: number;
}

interface StudentInterfaceProps {
  studentName: string;
  onNameSubmit: (name: string) => void;
  onBack: () => void;
}

const StudentInterface = ({ studentName, onNameSubmit, onBack }: StudentInterfaceProps) => {
  const [name, setName] = useState(studentName);
  const [currentPoll, setCurrentPoll] = useState<Poll | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [showResults, setShowResults] = useState(false);

  // Mock poll data
  useEffect(() => {
    if (studentName) {
      // Simulate receiving a poll
      const mockPoll: Poll = {
        id: '1',
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        timeLimit: 60,
        timeRemaining: 60
      };
      setCurrentPoll(mockPoll);
      setTimeRemaining(60);
    }
  }, [studentName]);

  // Timer countdown
  useEffect(() => {
    if (currentPoll && timeRemaining > 0 && !hasSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentPoll, hasSubmitted, timeRemaining]);

  const handleNameSubmit = () => {
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption !== null) {
      setHasSubmitted(true);
      setShowResults(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Name entry screen
  if (!studentName) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="poll-card max-w-md w-full p-8 text-center">
          <button 
            onClick={onBack}
            className="absolute top-4 left-4 flex items-center space-x-2 text-poll-text-light hover:text-poll-purple transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-poll-purple-light rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-poll-purple" />
            </div>
            <h1 className="text-2xl font-bold text-poll-text mb-2">
              Let's Get Started
            </h1>
            <p className="text-poll-text-light">
              If you're a student, you'll be able to submit your answers, participate in live polls, and see your responses compared with your classmates.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-medium text-poll-text mb-2">
                Enter your Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Balaji"
                className="w-full"
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              />
            </div>

            <Button 
              onClick={handleNameSubmit}
              disabled={!name.trim()}
              className="poll-button-primary w-full"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Waiting for poll
  if (!currentPoll) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="poll-card max-w-md w-full p-8 text-center">
          <button 
            onClick={onBack}
            className="absolute top-4 left-4 flex items-center space-x-2 text-poll-text-light hover:text-poll-purple transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-poll-purple-light rounded-full mb-4">
              <Loader2 className="w-8 h-8 text-poll-purple animate-spin" />
            </div>
            <h1 className="text-xl font-bold text-poll-text mb-2">
              Wait for the teacher to ask questions..
            </h1>
          </div>
        </div>
      </div>
    );
  }

  // Poll results view
  if (showResults) {
    const mockResults = [
      { option: 'Mars', percentage: 75, votes: 3 },
      { option: 'Venus', percentage: 6, votes: 1 },
      { option: 'Jupiter', percentage: 9, votes: 0 },
      { option: 'Saturn', percentage: 10, votes: 1 }
    ];

    return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-poll-text-light hover:text-poll-purple transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="poll-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium text-poll-text-light">Question 1</h2>
              <span className="text-sm text-poll-success font-medium">00:18</span>
            </div>

            <h1 className="text-xl font-bold text-poll-text mb-8">
              {currentPoll.question}
            </h1>

            <div className="space-y-4 mb-8">
              {mockResults.map((result, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-poll-purple rounded-full"></div>
                      <span className="text-poll-text font-medium">{result.option}</span>
                    </div>
                    <span className="text-poll-text font-bold">{result.percentage}%</span>
                  </div>
                  <div className="w-full bg-poll-border rounded-full h-2">
                    <div 
                      className="poll-progress-bar h-2 rounded-full transition-all duration-700"
                      style={{ width: `${result.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-poll-text-light">
              Wait for the teacher to ask a new question.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active poll - answer submission
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-poll-text-light hover:text-poll-purple transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="poll-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-poll-text-light">Question 1</h2>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-poll-warning" />
              <span className={`text-sm font-bold ${timeRemaining <= 10 ? 'text-red-500 animate-pulse' : 'text-poll-warning'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          <h1 className="text-xl font-bold text-poll-text mb-2">
            {currentPoll.question}
          </h1>

          <div className="mb-8 flex justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🪐</div>
              <p className="text-poll-text-light text-sm">Select your answer</p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {currentPoll.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                  selectedOption === index
                    ? 'border-poll-purple bg-poll-purple-light/20 text-poll-purple-dark'
                    : 'border-poll-border hover:border-poll-purple hover:bg-poll-purple-light/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedOption === index 
                      ? 'bg-poll-purple border-poll-purple' 
                      : 'border-poll-border'
                  }`}></div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className="poll-button-primary w-full"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentInterface;