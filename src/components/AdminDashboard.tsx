import React, { useState } from 'react';
import { BarChart3, Users, AlertTriangle, TrendingUp, Calendar, Clock, FileText, Bell, Settings, Award, Search, Filter, Eye, User, GraduationCap, BookOpen, PieChart, CalendarDays, BarChart, School, UserCheck, UserX, ChevronRight, Download } from 'lucide-react';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semana');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState('todas');
  const [showStudentDetails, setShowStudentDetails] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchStudent, setSearchStudent] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(12);

  // Datos detallados del estudiante seleccionado
  const getStudentDetailedHistory = (studentId: number) => {
    return {
      personalInfo: {
        fullName: 'Ana García Rodríguez',
        birthDate: '2008-03-15',
        address: 'Calle 123 #45-67, Bogotá',
        phone: '300-123-4567',
        parentName: 'Carlos García',
        parentPhone: '301-987-6543',
        emergencyContact: 'María Rodríguez - 302-456-7890'
      },
      academicInfo: {
        enrollmentDate: '2023-02-01',
        currentGPA: 4.2,
        totalCredits: 45,
        behaviorGrade: 'Excelente'
      },
      attendanceBySubject: [
        { subject: 'Matemáticas', teacher: 'Prof. García', present: 28, absent: 2, late: 1, total: 31, percentage: 90 },
        { subject: 'Historia', teacher: 'Prof. Martínez', present: 29, absent: 1, late: 0, total: 30, percentage: 97 },
        { subject: 'Ciencias', teacher: 'Prof. López', present: 27, absent: 3, late: 2, total: 32, percentage: 84 },
        { subject: 'Inglés', teacher: 'Prof. Smith', present: 30, absent: 0, late: 1, total: 31, percentage: 97 },
        { subject: 'Arte', teacher: 'Prof. Rivera', present: 25, absent: 1, late: 0, total: 26, percentage: 96 }
      ],
      recentHistory: [
        { date: '2025-01-27', subject: 'Matemáticas', status: 'presente', time: '08:00', notes: '' },
        { date: '2025-01-27', subject: 'Historia', status: 'presente', time: '09:00', notes: '' },
        { date: '2025-01-26', subject: 'Matemáticas', status: 'presente', time: '08:00', notes: '' },
        { date: '2025-01-26', subject: 'Ciencias', status: 'tardanza', time: '10:15', notes: 'Llegó 15 min tarde' },
        { date: '2025-01-25', subject: 'Matemáticas', status: 'ausente', time: '-', notes: 'Cita médica justificada' },
        { date: '2025-01-25', subject: 'Inglés', status: 'presente', time: '11:00', notes: '' },
        { date: '2025-01-24', subject: 'Arte', status: 'presente', time: '14:00', notes: 'Participación destacada' }
      ],
      alerts: [
        { type: 'warning', message: 'Asistencia en Ciencias por debajo del 85%', date: '2025-01-25' },
        { type: 'info', message: 'Excelente rendimiento en Historia e Inglés', date: '2025-01-20' }
      ],
      parentCommunications: [
        { date: '2025-01-25', type: 'email', subject: 'Ausencia justificada', status: 'enviado' },
        { date: '2025-01-20', type: 'llamada', subject: 'Felicitación por rendimiento', status: 'completado' },
        { date: '2025-01-15', type: 'reunión', subject: 'Seguimiento académico', status: 'programado' }
      ]
    };
  };

  const stats = [
    { 
      title: 'Asistencia Promedio', 
      value: '87.5%', 
      change: '+2.3%', 
      icon: TrendingUp,
      color: 'bg-green-500',
      description: 'vs semana anterior'
    },
    { 
      title: 'Total Estudiantes', 
      value: '1,247', 
      change: '+15', 
      icon: Users,
      color: 'bg-blue-500',
      description: 'estudiantes activos'
    },
    { 
      title: 'Clases Programadas', 
      value: '32', 
      change: '8 pendientes', 
      icon: Calendar,
      color: 'bg-purple-500',
      description: 'para hoy'
    },
    { 
      title: 'Clases Sin Asignar', 
      value: '7', 
      change: 'Requieren atención', 
      icon: AlertTriangle,
      color: 'bg-orange-500',
      description: 'sin estudiantes'
    },
    { 
      title: 'Alertas Críticas', 
      value: '23', 
      change: '+5 vs ayer', 
      icon: AlertTriangle,
      color: 'bg-red-500',
      description: 'estudiantes en riesgo'
    }
  ];

  const grades = [
    { id: 'todos', name: 'Todos los Grados' },
    { id: '6', name: '6° Grado' },
    { id: '7', name: '7° Grado' },
    { id: '8', name: '8° Grado' },
    { id: '9', name: '9° Grado' },
    { id: '10', name: '10° Grado' },
    { id: '11', name: '11° Grado' }
  ];

  const subjects = [
    { id: 'todas', name: 'Todas las Materias' },
    { id: 'matematicas', name: 'Matemáticas' },
    { id: 'historia', name: 'Historia' },
    { id: 'ciencias', name: 'Ciencias' },
    { id: 'ingles', name: 'Inglés' },
    { id: 'arte', name: 'Arte' },
    { id: 'educacion-fisica', name: 'Educación Física' }
  ];

  const allStudents = [
    { id: 1, name: 'Ana García', code: 'EST001', grade: '9°A', attendance: 98, absences: 1, tardanzas: 0, photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 2, name: 'Carlos Rodríguez', code: 'EST002', grade: '8°B', attendance: 96, absences: 2, tardanzas: 1, photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 3, name: 'María López', code: 'EST003', grade: '7°A', attendance: 97, absences: 1, tardanzas: 1, photo: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 4, name: 'Pedro Sánchez', code: 'EST004', grade: '9°A', attendance: 65, absences: 8, tardanzas: 2, photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 5, name: 'Sofia Herrera', code: 'EST005', grade: '9°B', attendance: 95, absences: 2, tardanzas: 0, photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 6, name: 'Laura Jiménez', code: 'EST006', grade: '8°B', attendance: 72, absences: 6, tardanzas: 3, photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 7, name: 'Diego Martín', code: 'EST007', grade: '7°A', attendance: 89, absences: 3, tardanzas: 1, photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 8, name: 'Carmen Ruiz', code: 'EST008', grade: '9°B', attendance: 62, absences: 9, tardanzas: 4, photo: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150' }
  ];

  const recentReports = [
    { 
      id: 1,
      subject: 'Matemáticas', 
      grade: '9°A',
      teacher: 'Prof. García', 
      present: 28, 
      absent: 3,
      late: 1,
      total: 32, 
      date: selectedDate,
      time: '08:00',
      classroom: 'Aula 201',
      students: [
        { name: 'Ana García', status: 'presente' },
        { name: 'Pedro Sánchez', status: 'ausente' },
        { name: 'Carlos López', status: 'tardanza' }
      ]
    },
    { 
      id: 2,
      subject: 'Historia', 
      grade: '8°B',
      teacher: 'Prof. Martínez', 
      present: 24, 
      absent: 3,
      late: 1,
      total: 28, 
      date: selectedDate,
      time: '09:00',
      classroom: 'Aula 105',
      students: [
        { name: 'Laura Jiménez', status: 'presente' },
        { name: 'Roberto Vega', status: 'ausente' }
      ]
    },
    { 
      id: 3,
      subject: 'Ciencias', 
      grade: '7°A',
      teacher: 'Prof. López', 
      present: 30, 
      absent: 1,
      late: 0,
      total: 31, 
      date: selectedDate,
      time: '10:00',
      classroom: 'Lab. Ciencias',
      students: [
        { name: 'María López', status: 'presente' },
        { name: 'Diego Martín', status: 'presente' }
      ]
    }
  ];

  const criticalStudents = allStudents.filter(s => s.attendance < 75);
  const topPerformers = allStudents.filter(s => s.attendance >= 95);

  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
                         student.code.toLowerCase().includes(searchStudent.toLowerCase());
    const matchesGrade = selectedGrade === 'todas' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchStudent(value);
    setCurrentPage(1);
  };

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value);
    setCurrentPage(1);
  };

  const getAttendanceColor = (present: number, total: number) => {
    const percentage = (present / total) * 100;
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStudentAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const viewReportDetails = (reportId: number) => {
    setSelectedReport(selectedReport === reportId.toString() ? null : reportId.toString());
  };

  const viewStudentDetails = (studentId: string) => {
    setShowStudentDetails(studentId);
  };

  const selectedReportData = recentReports.find(r => r.id.toString() === selectedReport);
  const selectedStudentData = allStudents.find(s => s.id.toString() === showStudentDetails);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h2>
          <p className="text-gray-600 mt-1">Gestión completa de asistencia y reportes escolares</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <FileText className="h-4 w-4" />
            <span>Reporte Completo</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Exportar Datos</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filtros Avanzados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Específica</label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Student Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Estudiante</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Nombre o código..."
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Grade Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Grado</label>
            <select 
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {grades.map(grade => (
                <option key={grade.id} value={grade.id}>{grade.name}</option>
              ))}
            </select>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Materia</label>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>

          {/* Period Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="dia">Hoy</option>
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mes</option>
              <option value="trimestre">Trimestre</option>
              <option value="año">Año Escolar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Student Search Results */}
      {searchStudent && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Resultados de Búsqueda ({filteredStudents.length})
            </h3>
          </div>
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
                      <p className="text-sm text-gray-600">{student.code} • {student.grade}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getStudentAttendanceColor(student.attendance)}`}>
                        {student.attendance}%
                      </div>
                      <div className="text-sm text-gray-600">Asistencia</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        <span className="text-red-600">{student.absences} ausencias</span> • 
                        <span className="text-yellow-600 ml-1">{student.tardanzas} tardanzas</span>
                      </div>
                    </div>
                    <button
                      onClick={() => viewStudentDetails(student.id.toString())}
                      className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">Ver Historial</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {showStudentDetails && selectedStudentData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedStudentData.photo}
                    alt={selectedStudentData.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-200"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedStudentData.name}</h3>
                    <p className="text-gray-600">{selectedStudentData.code} • {selectedStudentData.grade}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStudentAttendanceColor(selectedStudentData.attendance)} bg-opacity-20`}>
                        {selectedStudentData.attendance}% Asistencia General
                      </span>
                      <span className="text-xs text-gray-500">Estudiante desde Feb 2023</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowStudentDetails(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Contenido del Modal */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Información Personal */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Datos Personales */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Información Personal
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-600">Nombre Completo:</span>
                        <div className="font-medium">Ana García Rodríguez</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Fecha de Nacimiento:</span>
                        <div className="font-medium">15 de Marzo, 2008 (16 años)</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Dirección:</span>
                        <div className="font-medium">Calle 123 #45-67, Bogotá</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Teléfono:</span>
                        <div className="font-medium">300-123-4567</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Fecha de Matrícula:</span>
                        <div className="font-medium">1 de Febrero, 2023</div>
                      </div>
                    </div>
                  </div>

                  {/* Contacto Familiar */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Contacto Familiar
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-600">Padre/Madre:</span>
                        <div className="font-medium">Carlos García</div>
                        <div className="text-gray-500">301-987-6543</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Contacto de Emergencia:</span>
                        <div className="font-medium">María Rodríguez</div>
                        <div className="text-gray-500">302-456-7890</div>
                      </div>
                    </div>
                  </div>

                  {/* Información Académica */}
                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Rendimiento Académico
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-600">Promedio General:</span>
                        <div className="font-bold text-green-600 text-lg">4.2 / 5.0</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Créditos Completados:</span>
                        <div className="font-medium">45 / 60</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Comportamiento:</span>
                        <div className="font-medium text-green-600">Excelente</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Asistencia Detallada */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Resumen de Asistencia */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Resumen de Asistencia
                    </h4>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedStudentData.attendance}%</div>
                        <div className="text-sm text-gray-600">Asistencia General</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">142</div>
                        <div className="text-sm text-gray-600">Clases Asistidas</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{selectedStudentData.absences}</div>
                        <div className="text-sm text-gray-600">Total Ausencias</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">{selectedStudentData.tardanzas}</div>
                        <div className="text-sm text-gray-600">Total Tardanzas</div>
                      </div>
                    </div>
                  </div>

                  {/* Asistencia por Materia */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Asistencia por Materia
                    </h4>
                    <div className="space-y-4">
                      {[
                        { subject: 'Matemáticas', teacher: 'Prof. García', present: 28, absent: 2, late: 1, total: 31, percentage: 90 },
                        { subject: 'Historia', teacher: 'Prof. Martínez', present: 29, absent: 1, late: 0, total: 30, percentage: 97 },
                        { subject: 'Ciencias', teacher: 'Prof. López', present: 27, absent: 3, late: 2, total: 32, percentage: 84 },
                        { subject: 'Inglés', teacher: 'Prof. Smith', present: 30, absent: 0, late: 1, total: 31, percentage: 97 },
                        { subject: 'Arte', teacher: 'Prof. Rivera', present: 25, absent: 1, late: 0, total: 26, percentage: 96 }
                      ].map((subject, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{subject.subject}</div>
                            <div className="text-sm text-gray-600">{subject.teacher}</div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm">
                              <span className="text-green-600 font-medium">{subject.present} presentes</span> • 
                              <span className="text-red-600 font-medium ml-1">{subject.absent} ausentes</span> • 
                              <span className="text-yellow-600 font-medium ml-1">{subject.late} tardanzas</span>
                            </div>
                            <div className={`text-lg font-bold ${getStudentAttendanceColor(subject.percentage)}`}>
                              {subject.percentage}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Historial Reciente */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Historial Reciente (Últimos 7 días)
                    </h4>
                    <div className="space-y-3">
                      {[
                        { date: '2025-01-27', subject: 'Matemáticas', status: 'presente', time: '08:00', notes: '' },
                        { date: '2025-01-27', subject: 'Historia', status: 'presente', time: '09:00', notes: '' },
                        { date: '2025-01-26', subject: 'Matemáticas', status: 'presente', time: '08:00', notes: '' },
                        { date: '2025-01-26', subject: 'Ciencias', status: 'tardanza', time: '10:15', notes: 'Llegó 15 min tarde' },
                        { date: '2025-01-25', subject: 'Matemáticas', status: 'ausente', time: '-', notes: 'Cita médica justificada' },
                        { date: '2025-01-25', subject: 'Inglés', status: 'presente', time: '11:00', notes: '' },
                        { date: '2025-01-24', subject: 'Arte', status: 'presente', time: '14:00', notes: 'Participación destacada' }
                      ].map((record, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              record.status === 'presente' ? 'bg-green-100 text-green-800' :
                              record.status === 'ausente' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {record.status === 'presente' ? '✓' : record.status === 'ausente' ? '✗' : '!'}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {new Date(record.date).toLocaleDateString('es-ES', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })} - {record.subject}
                              </div>
                              <div className="text-sm text-gray-600">
                                {record.time} {record.notes && `• ${record.notes}`}
                              </div>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            record.status === 'presente' ? 'bg-green-100 text-green-800' :
                            record.status === 'ausente' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alertas y Comunicaciones */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Alertas */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Alertas Activas
                      </h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="text-sm font-medium text-yellow-800">Asistencia en Ciencias</div>
                          <div className="text-xs text-yellow-600">Por debajo del 85% (84%)</div>
                          <div className="text-xs text-gray-500 mt-1">25 Ene 2025</div>
                        </div>
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-sm font-medium text-green-800">Excelente rendimiento</div>
                          <div className="text-xs text-green-600">Historia e Inglés 97%</div>
                          <div className="text-xs text-gray-500 mt-1">20 Ene 2025</div>
                        </div>
                      </div>
                    </div>

                    {/* Comunicaciones */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Bell className="h-5 w-5 mr-2" />
                        Comunicaciones
                      </h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-sm font-medium text-blue-800">Email enviado</div>
                          <div className="text-xs text-blue-600">Ausencia justificada</div>
                          <div className="text-xs text-gray-500 mt-1">25 Ene 2025</div>
                        </div>
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-sm font-medium text-green-800">Llamada completada</div>
                          <div className="text-xs text-green-600">Felicitación por rendimiento</div>
                          <div className="text-xs text-gray-500 mt-1">20 Ene 2025</div>
                        </div>
                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="text-sm font-medium text-purple-800">Reunión programada</div>
                          <div className="text-xs text-purple-600">Seguimiento académico</div>
                          <div className="text-xs text-gray-500 mt-1">15 Ene 2025</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones del Modal */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <FileText className="h-4 w-4" />
                    <span>Reporte Individual PDF</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                    <Bell className="h-4 w-4" />
                    <span>Notificar a Padres</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Calendar className="h-4 w-4" />
                    <span>Programar Reunión</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <TrendingUp className="h-4 w-4" />
                    <span>Plan de Mejora</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <GraduationCap className="h-4 w-4" />
                    <span>Ver Calificaciones</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Crear Alerta</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reports */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Reportes del {new Date(selectedDate).toLocaleDateString('es-ES')}
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-900 transition-colors">
                    <BarChart className="h-4 w-4" />
                    <span>Gráficos</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-900 transition-colors">
                    <PieChart className="h-4 w-4" />
                    <span>Estadísticas</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentReports.map((report) => {
                const percentage = Math.round((report.present / report.total) * 100);
                const isExpanded = selectedReport === report.id.toString();
                
                return (
                  <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {report.subject} - {report.grade}
                            </h4>
                            <p className="text-sm text-gray-600">{report.teacher}</p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {report.time}
                              </span>
                              <span className="flex items-center">
                                <School className="h-3 w-3 mr-1" />
                                {report.classroom}
                              </span>
                              <span className="flex items-center">
                                <CalendarDays className="h-3 w-3 mr-1" />
                                {new Date(report.date).toLocaleDateString('es-ES')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded">
                              <UserCheck className="h-4 w-4 mr-1" />
                              {report.present}
                            </span>
                            <span className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded">
                              <UserX className="h-4 w-4 mr-1" />
                              {report.absent}
                            </span>
                            <span className="flex items-center text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                              <Clock className="h-4 w-4 mr-1" />
                              {report.late}
                            </span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor(report.present, report.total)}`}>
                            {percentage}% Asistencia
                          </span>
                        </div>
                        
                        <button
                          onClick={() => viewReportDetails(report.id)}
                          className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">Detalles</span>
                          <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                      </div>
                    </div>
                    
                    {isExpanded && selectedReportData && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-3">Detalles de la Clase</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-gray-600">Total Estudiantes:</span>
                            <div className="font-semibold">{selectedReportData.total}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Presentes:</span>
                            <div className="font-semibold text-green-600">{selectedReportData.present}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Ausentes:</span>
                            <div className="font-semibold text-red-600">{selectedReportData.absent}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Tardanzas:</span>
                            <div className="font-semibold text-yellow-600">{selectedReportData.late}</div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h6 className="font-medium text-gray-900 mb-2">Lista de Estudiantes:</h6>
                          <div className="space-y-2">
                            {selectedReportData.students.map((student, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                                <span className="text-sm">{student.name}</span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  student.status === 'presente' ? 'bg-green-100 text-green-800' :
                                  student.status === 'ausente' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                            Lista Completa PDF
                          </button>
                          <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors">
                            Enviar a Coordinación
                          </button>
                          <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors">
                            Comparar con Clases Anteriores
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Critical Students */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                Estudiantes en Riesgo ({criticalStudents.length})
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {criticalStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-600">{student.grade}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 font-bold">{student.attendance}%</div>
                    <div className="text-xs text-gray-500">{student.absences} ausencias</div>
                  </div>
                </div>
              ))}
              <button className="w-full mt-3 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-sm">
                Generar Plan de Intervención
              </button>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Award className="h-5 w-5 mr-2 text-green-500" />
                Mejor Asistencia ({topPerformers.length})
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {topPerformers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-600">{student.grade}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-bold">{student.attendance}%</div>
                    <div className="text-xs text-gray-500">Excelente</div>
                  </div>
                </div>
              ))}
              <button className="w-full mt-3 px-4 py-2 text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors text-sm">
                Generar Reconocimientos
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Acciones Rápidas
              </h3>
            </div>
            <div className="p-4 space-y-2">
              <button className="w-full px-4 py-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="font-medium text-blue-900 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Reporte Mensual Completo
                </div>
                <div className="text-sm text-blue-600">Exportar todos los datos</div>
              </button>
              <button className="w-full px-4 py-3 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                <div className="font-medium text-yellow-900 flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificaciones Masivas
                </div>
                <div className="text-sm text-yellow-600">A padres y estudiantes</div>
              </button>
              <button className="w-full px-4 py-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <div className="font-medium text-purple-900 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Configurar Alertas
                </div>
                <div className="text-sm text-purple-600">Umbrales automáticos</div>
              </button>
              <button className="w-full px-4 py-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="font-medium text-green-900 flex items-center">
                  <BarChart className="h-4 w-4 mr-2" />
                  Análisis Predictivo
                </div>
                <div className="text-sm text-green-600">Tendencias y patrones</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All Students Section */}
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Users className="h-6 w-6 mr-2 text-blue-500" />
              Todos los Estudiantes ({allStudents.length})
            </h2>
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar estudiante..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchStudent}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
              {/* Grade Filter */}
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedGrade}
                onChange={(e) => handleGradeChange(e.target.value)}
              >
                <option value="todas">Todos los Grados</option>
                <option value="6°A">6° Grado</option>
                <option value="7°A">7° Grado</option>
                <option value="8°B">8° Grado</option>
                <option value="9°A">9° Grado</option>
                <option value="9°B">9° Grado B</option>
                <option value="10°">10° Grado</option>
                <option value="11°">11° Grado</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentStudents.map((student) => (
              <div key={student.id} className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-600">{student.code}</p>
                    <p className="text-sm text-gray-500">{student.grade}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Asistencia:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      student.attendance >= 95 ? 'bg-green-100 text-green-800' :
                      student.attendance >= 85 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.attendance}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ausencias:</span>
                    <span className="text-sm font-medium text-red-600">{student.absences}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tardanzas:</span>
                    <span className="text-sm font-medium text-yellow-600">{student.tardanzas}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <button 
                    onClick={() => viewStudentDetails(student.id.toString())}
                    className="w-full px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {currentStudents.length === 0 && filteredStudents.length > 0 && (
            <div className="text-center py-8">
              <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No hay estudiantes en esta página.</p>
            </div>
          )}
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No se encontraron estudiantes que coincidan con los filtros.</p>
            </div>
          )}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Página {currentPage} de {totalPages} • Mostrando {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} de {filteredStudents.length} estudiantes
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          currentPage === pageNumber
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Summary Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <span className="text-gray-600">
                Mostrando <span className="font-medium">{filteredStudents.length}</span> de <span className="font-medium">{allStudents.length}</span> estudiantes
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Exportar Lista
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                Reporte General
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;