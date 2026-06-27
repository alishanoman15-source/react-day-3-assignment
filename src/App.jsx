import React from 'react';
import './App.css';
import StudentList from './components/StudentList';
import ProductSearch from './components/ProductSearch';
import TaskManager from './components/TaskManager';

function App() {
  return (
    <div className="app-shell">
      <h1 className="page-title">Day 3: React Lists & CRUD ✨</h1>
      <p className="page-subtitle">A polished showcase of dynamic lists, live search, and task management.</p>

      <div className="section-card">
        <StudentList />
      </div>

      <div className="section-card">
        <ProductSearch />
      </div>

      <div className="section-card">
        <TaskManager />
      </div>
    </div>
  );
}

export default App;