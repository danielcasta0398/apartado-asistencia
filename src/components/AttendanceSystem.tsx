import React, { useState } from 'react';
import { Check, X, Clock, Search, Save } from 'lucide-react';

const AttendanceSystem = () => {
  const [selectedClass, setSelectedClass] = useState('matematicas-9a');
  const [searchTerm, setSearchTerm] = useState('');
  const [attendance, setAttendance] = useState<Record<string, 'presente' | 'ausente' | 'tardanza' | null>>({});

  const classes = [
    { id: 'matematicas-9a', name: 'Matemáticas 9°A', schedule: '08:00 - 09:00', teacher: 'Prof. García' },
    { id: 'historia-8b', name: 'Historia 8°B', schedule: '09:00 - 10:00', teacher: 'Prof. Martínez' },
    { id: 'ciencias-7a', name: 'Ciencias 7°A', schedule: '10:00 - 11:00', teacher: 'Prof. López' },
    { id: 'ingles-9b', name: 'Inglés 9°B', schedule: '11:00 - 12:00', teacher: 'Prof. Smith' }
  ];

  const students = [
    { id: 1, name: 'Ana García', code: 'EST001', photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 2, name: 'Carlos Rodríguez', code: 'EST002', photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 3, name: 'María López', code: 'EST003', photo: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 4, name: 'Diego Martín', code: 'EST004', photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 5, name: 'Sofia Herrera', code: 'EST005', photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 6, name: 'Alejandro Cruz', code: 'EST006', photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150' }
  ];

  const currentClass = classes.find(c => c.id === selectedClass);
  
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttendanceChange = (studentId: number, status: 'presente' | 'ausente' | 'tardanza') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: prev[studentId] === status ? null : status
    }));
  };

  const getStatusColor = (status: 'presente' | 'ausente' | 'tardanza' | null) => {
    switch (status) {
      case 'presente': return 'bg-green-500 text-white';
      case 'ausente': return 'bg-red-500 text-white';
      case 'tardanza': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-200 text-gray-600 hover:bg-gray-300';
    }
  };

  const getAttendanceSummary = () => {
    const total = students.length;
    const presente = Object.values(attendance).filter(s => s === 'presente').length;
    const ausente = Object.values(attendance).filter(s => s === 'ausente').length;
    const tardanza = Object.values(attendance).filter(s => s === 'tardanza').length;
    return { total, presente, ausente, tardanza };
  };

  const summary = getAttendanceSummary();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tomar Asistencia</h2>
          <p className="text-gray-600 mt-1">Registra la asistencia de los estudiantes</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Save className="h-5 w-5" />
          <span>Guardar Asistencia</span>
        </button>
      </div>

      {/* Class Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seleccionar Clase</h3>
            <div className="space-y-2">
              {classes.map((classItem) => (
                <button
                  key={classItem.id}
                  onClick={() => setSelectedClass(classItem.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedClass === classItem.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="font-medium text-gray-900">{classItem.name}</div>
                  <div className="text-sm text-gray-600">{classItem.schedule}</div>
                  <div className="text-sm text-gray-500">{classItem.teacher}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Class Info & Search */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{currentClass?.name}</h3>
                  <p className="text-gray-600">{currentClass?.schedule} • {currentClass?.teacher}</p>
                </div>
                <div className="flex space-x-4 text-sm">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    Presentes: {summary.presente}
                  </span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
                    Ausentes: {summary.ausente}
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    Tardanzas: {summary.tardanza}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar estudiante por nombre o código..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Students List */}
            <div className="p-6">
              <div className="grid gap-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.code}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAttendanceChange(student.id, 'presente')}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${getStatusColor(attendance[student.id] === 'presente' ? 'presente' : null)}`}
                      >
                        <Check className="h-4 w-4" />
                        <span className="text-sm">Presente</span>
                      </button>
                      
                      <button
                        onClick={() => handleAttendanceChange(student.id, 'tardanza')}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${getStatusColor(attendance[student.id] === 'tardanza' ? 'tardanza' : null)}`}
                      >
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Tardanza</span>
                      </button>
                      
                      <button
                        onClick={() => handleAttendanceChange(student.id, 'ausente')}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${getStatusColor(attendance[student.id] === 'ausente' ? 'ausente' : null)}`}
                      >
                        <X className="h-4 w-4" />
                        <span className="text-sm">Ausente</span>
                      </button>
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

export default AttendanceSystem;