import { useState } from "react";
import { Users, GraduationCap } from "lucide-react";
import RoleSelection from "@/components/RoleSelection";
import TeacherDashboard from "@/components/TeacherDashboard";
import StudentInterface from "@/components/StudentInterface";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'student' | null>(null);
  const [studentName, setStudentName] = useState<string>('');

  const handleRoleSelect = (role: 'teacher' | 'student') => {
    setSelectedRole(role);
  };

  const handleStudentNameSubmit = (name: string) => {
    setStudentName(name);
  };

  const resetToRoleSelection = () => {
    setSelectedRole(null);
    setStudentName('');
  };

  return (
    <div className="min-h-screen bg-poll-bg">
      {!selectedRole && (
        <RoleSelection onRoleSelect={handleRoleSelect} />
      )}
      
      {selectedRole === 'teacher' && (
        <TeacherDashboard onBack={resetToRoleSelection} />
      )}
      
      {selectedRole === 'student' && (
        <StudentInterface 
          studentName={studentName}
          onNameSubmit={handleStudentNameSubmit}
          onBack={resetToRoleSelection}
        />
      )}
    </div>
  );
};

export default Index;