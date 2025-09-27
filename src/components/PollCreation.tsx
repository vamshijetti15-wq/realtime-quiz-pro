import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PollCreationProps {
  onBack: () => void;
  onCreatePoll: (question: string, options: string[], timeLimit: number) => void;
}

const PollCreation = ({ onBack, onCreatePoll }: PollCreationProps) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [timeLimit, setTimeLimit] = useState(60);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    const validOptions = options.filter(opt => opt.trim() !== "");
    if (question.trim() && validOptions.length >= 2) {
      onCreatePoll(question.trim(), validOptions, timeLimit);
    }
  };

  const isValid = question.trim() !== "" && options.filter(opt => opt.trim() !== "").length >= 2;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-poll-text-light hover:text-poll-purple transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="poll-card p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-poll-text mb-2">
              Let's Get Started
            </h1>
            <p className="text-poll-text-light">
              You'll launch live polling to manage and manage polls, ask questions, and monitor your students' responses in real-time.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-poll-text mb-2">
                Enter your question
              </label>
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Rahul Balaji"
                rows={3}
                className="w-full"
              />
              <div className="text-right text-xs text-poll-text-light mt-1">
                {question.length}/100
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-poll-text">
                  Add Options
                </label>
                <select
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                  className="px-3 py-1 border border-poll-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-poll-purple"
                >
                  <option value={30}>30 seconds</option>
                  <option value={60}>60 seconds</option>
                  <option value={90}>90 seconds</option>
                  <option value={120}>120 seconds</option>
                </select>
              </div>

              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="w-4 h-4 bg-poll-purple rounded-full"></div>
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder="Rahul Balaji"
                        className="flex-1"
                      />
                    </div>
                    {options.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addOption}
                className="mt-4 flex items-center space-x-2 text-poll-purple hover:bg-poll-purple-light/20 px-3 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add More Option</span>
              </button>
            </div>

            <div className="flex items-center space-x-2 text-sm text-poll-text-light">
              <Clock className="w-4 h-4" />
              <span>Is it Correct?</span>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleSubmit}
                disabled={!isValid}
                className="poll-button-primary flex-1"
              >
                + Ask a new question
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollCreation;