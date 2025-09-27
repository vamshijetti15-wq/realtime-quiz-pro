import { Users, GraduationCap } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: 'teacher' | 'student') => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="poll-card max-w-lg w-full p-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-poll-purple-light rounded-full mb-4">
            <Users className="w-8 h-8 text-poll-purple" />
          </div>
          <h1 className="text-3xl font-bold text-poll-text mb-2">
            Welcome to the Live Polling System
          </h1>
          <p className="text-poll-text-light">
            Please select the role that best describes you to begin using the live polling system.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <button
            onClick={() => onRoleSelect('student')}
            className="w-full poll-card p-6 border-2 border-poll-border hover:border-poll-purple hover:bg-poll-purple-light/10 transition-all duration-300 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-poll-purple-light rounded-lg flex items-center justify-center group-hover:bg-poll-purple group-hover:text-white transition-colors">
                <Users className="w-6 h-6 text-poll-purple group-hover:text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-poll-text">I'm a Student</h3>
                <p className="text-sm text-poll-text-light">
                  Submit answers to questions set by your teacher and see the results.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onRoleSelect('teacher')}
            className="w-full poll-card p-6 border-2 border-poll-border hover:border-poll-purple hover:bg-poll-purple-light/10 transition-all duration-300 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-poll-purple-light rounded-lg flex items-center justify-center group-hover:bg-poll-purple group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6 text-poll-purple group-hover:text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-poll-text">I'm a Teacher</h3>
                <p className="text-sm text-poll-text-light">
                  Create questions and see how your students respond in real-time.
                </p>
              </div>
            </div>
          </button>
        </div>

        <button className="poll-button-primary w-full">
          Continue
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;