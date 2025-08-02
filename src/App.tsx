import React, { useState } from 'react';
import { Users, ClipboardList, BarChart3, Calendar, GraduationCap } from 'lucide-react';
import AdminDashboard from './components/AdminDashboard';
import AttendanceSystem from './components/AttendanceSystem';
import StudentView from './components/StudentView';

type View = 'admin' | 'attendance' | 'students';

function App() {
  const [currentView, setCurrentView] = useState<View>('admin');

  const navigationItems = [
    { id: 'admin', label: 'Reportes Admin', icon: BarChart3 },
    { id: 'attendance', label: 'Tomar Asistencia', icon: ClipboardList },
    { id: 'students', label: 'Vista Estudiantes', icon: Users }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'admin':
        return <AdminDashboard />;
      case 'attendance':
        return <AttendanceSystem />;
      case 'students':
        return <StudentView />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EduAsistencia</h1>
                <p className="text-sm text-gray-600">Sistema de Gestión de Asistencia Escolar</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as View)}
                  className={`flex items-center space-x-2 py-4 px-3 border-b-2 transition-all duration-200 ${
                    currentView === item.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;