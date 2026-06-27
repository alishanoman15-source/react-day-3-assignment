import React from 'react';
import '../App.css';
import { MdSchool } from 'react-icons/md';

function StudentList() {
  const students = [
    { id: 1, name: 'Ayesha Tariq', course: 'Web Dev', grade: 'A', color: 'avatar--gradient-1' },
    { id: 2, name: 'Ali Khan', course: 'Graphic Design', grade: 'B+', color: 'avatar--gradient-2' },
    { id: 3, name: 'Sara Ahmed', course: 'App Dev', grade: 'A+', color: 'avatar--gradient-3' },
    { id: 4, name: 'Usman Raza', course: 'Data Science', grade: 'B', color: 'avatar--gradient-4' }
  ];

  const getInitials = (name) =>
    name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="premium-card">
      <h2 className="section-title">
        <MdSchool style={{ color: '#7c3aed', fontSize: '28px' }} />
        Student List
      </h2>

      <p className="section-subtitle">A friendly roster with animated rows and clear grade signals.</p>

      <div className="list-container">
        {students.map((student, index) => (
          <div
            key={student.id}
            className={`list-item student-row`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="student-main">
              <div className={`avatar ${student.color}`}>{getInitials(student.name)}</div>
              <div className="student-meta">
                <h4 className="item-name">{student.name}</h4>
                <p className="item-detail">{student.course}</p>
              </div>
            </div>
            <div className={`item-badge badge-grade--${student.grade.toLowerCase().replace('+', 'plus')}`}>
              {student.grade}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;