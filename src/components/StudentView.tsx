import React, { useState } from 'react';
import { Calendar, BookOpen, User, TrendingUp, Award } from 'lucide-react';

const StudentView = () => {
  const [selectedSubject, setSelectedSubject] = useState('matematicas');

  const subjects = [
    { id: 'matematicas', name: 'Matemáticas', teacher: 'Prof. García', attendance: 85 },
    { id: 'historia', name: 'Historia', teacher: 'Prof. Martínez', attendance: 92 },
    { id: 'ciencias', name: 'Ciencias', teacher: 'Prof. López', attendance: 78 },
    { id: 'ingles', name: 'Inglés', teacher: 'Prof. Smith', attendance: 88 },
    { id: 'arte', name: 'Arte', teacher: 'Prof. Rivera', attendance: 95 }
  ];

  const attendanceHistory = [
    { date: '2025-01-27', status: 'presente', subject: 'Matemáticas' },
    { date: '2025-01-26', status: 'presente', subject: 'Matemáticas' },
    { date: '2025-01-25', status: 'tardanza', subject: 'Matemáticas' },
    { date: '2025-01-24', status: 'presente', subject: 'Matemáticas' },
    { date: '2025-01-23', status: 'ausente', subject: 'Matemáticas' },
    { date: '2025-01-22', status: 'presente', subject: 'Matemáticas' },
    { date: '2025-01-21', status: 'presente', subject: 'Matemáticas' }
  ];

  const studentInfo = {
    name: 'Ana García',
    code: 'EST001',
    grade: '9°A',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
  };

  const currentSubject = subjects.find(s => s.id === selectedSubject);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'presente': return 'bg-green-100 text-green-800';
      case 'ausente': return 'bg-red-100 text-red-800';
      case 'tardanza': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'presente': return '✓';
      case 'ausente': return '✗';
      case 'tardanza': return '!';
      default: return '-';
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Vista del Estudiante</h2>
        <p className="text-gray-600 mt-1">Consulta tu asistencia por asignatura</p>
      </div>

      {/* Student Profile */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src={studentInfo.photo}
            alt={studentInfo.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{studentInfo.name}</h3>
            <p className="text-gray-600">{studentInfo.code} • {studentInfo.grade}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Asignaturas
              </h3>
            </div>
            <div className="p-4 space-y-2">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedSubject === subject.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{subject.name}</div>
                      <div className="text-sm text-gray-600">{subject.teacher}</div>
                    </div>
                    <div className={`text-right ${getAttendanceColor(subject.attendance)}`}>
                      <div className="font-bold text-lg">{subject.attendance}%</div>
                      <div className="text-xs">Asistencia</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subject Info */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{currentSubject?.name}</h3>
                  <p className="text-gray-600">{currentSubject?.teacher}</p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getAttendanceColor(currentSubject?.attendance || 0)}`}>
                    {currentSubject?.attendance}%
                  </div>
                  <div className="text-sm text-gray-600">Asistencia Total</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">14</div>
                  <div className="text-sm text-gray-600">Clases Asistidas</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-sm text-gray-600">Ausencias</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">1</div>
                  <div className="text-sm text-gray-600">Tardanzas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance History */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Historial de Asistencia - {currentSubject?.name}
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {attendanceHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;