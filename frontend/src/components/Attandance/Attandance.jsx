import React, { useState, useEffect } from 'react';

const AttendanceApp = () => {
  // Hardcoded student data
  const initialStudents = [
    { id: 1, name: 'Emma Johnson', studentId: 'S001', present: false },
    { id: 2, name: 'Noah Smith', studentId: 'S002', present: false },
    { id: 3, name: 'Olivia Davis', studentId: 'S003', present: false },
    { id: 4, name: 'Liam Brown', studentId: 'S004', present: false },
    { id: 5, name: 'Ava Wilson', studentId: 'S005', present: false },
    { id: 6, name: 'William Taylor', studentId: 'S006', present: false },
    { id: 7, name: 'Sophia Martinez', studentId: 'S007', present: false },
    { id: 8, name: 'Mason Anderson', studentId: 'S008', present: false },
    { id: 9, name: 'Isabella Thomas', studentId: 'S009', present: false },
    { id: 10, name: 'James Jackson', studentId: 'S010', present: false }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState(new Date());
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(initialStudents.length);

  // Update counts when attendance changes
  useEffect(() => {
    const present = students.filter(student => student.present).length;
    setPresentCount(present);
    setAbsentCount(students.length - present);
  }, [students]);

  // Toggle attendance status
  const toggleAttendance = (id) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset all attendance
  const resetAttendance = () => {
    setStudents(students.map(student => ({ ...student, present: false })));
  };

  // Mark all as present
  const markAllPresent = () => {
    setStudents(students.map(student => ({ ...student, present: true })));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <header className="text-center mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Attendance System</h1>
          <div className="text-xl text-gray-600">
            {date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={markAllPresent} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 md:flex-none"
            >
              Mark All Present
            </button>
            <button 
              onClick={resetAttendance} 
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex-1 md:flex-none"
            >
              Reset All
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-gray-600 text-sm mb-1">Total Students</div>
            <div className="text-3xl font-bold text-gray-800">{students.length}</div>
          </div>
          <div className="text-center p-4">
            <div className="text-gray-600 text-sm mb-1">Present</div>
            <div className="text-3xl font-bold text-green-600">{presentCount}</div>
          </div>
          <div className="text-center p-4">
            <div className="text-gray-600 text-sm mb-1">Absent</div>
            <div className="text-3xl font-bold text-red-600">{absentCount}</div>
          </div>
          <div className="text-center p-4">
            <div className="text-gray-600 text-sm mb-1">Attendance Rate</div>
            <div className="text-3xl font-bold text-blue-600">
              {students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0}%
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <div 
                key={student.id} 
                className={`flex flex-col md:flex-row items-center justify-between p-4 rounded-lg border-l-4 ${
                  student.present ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                } transition-all duration-300`}
              >
                <div className="mb-3 md:mb-0 text-center md:text-left">
                  <div className="font-semibold text-lg text-gray-800">{student.name}</div>
                  <div className="text-gray-600 text-sm">{student.studentId}</div>
                </div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={student.present}
                      onChange={() => toggleAttendance(student.id)}
                    />
                    <div className={`block w-14 h-7 rounded-full ${student.present ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${
                      student.present ? 'transform translate-x-7' : ''
                    }`}></div>
                  </div>
                  <div className="ml-3 font-medium text-gray-700 min-w-[60px]">
                    {student.present ? 'Present' : 'Absent'}
                  </div>
                </label>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500 italic">
              No students found matching your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceApp;