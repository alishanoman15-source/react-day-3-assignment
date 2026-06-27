import React, { useState } from 'react';
import '../App.css';
import { MdAssignment, MdAdd, MdDelete, MdEdit, MdCheckCircle, MdSave, MdCancel, MdSearch } from 'react-icons/md';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [newTaskId, setNewTaskId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  // 1. Search text ke liye nayi state
  const [searchQuery, setSearchQuery] = useState('');

  const addTask = () => {
    if (taskText.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      isCompleted: false
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskId(newTask.id);
    setTaskText('');

    window.setTimeout(() => setNewTaskId(null), 400);
  };

  const deleteTask = (id) => {
    setDeletingId(id);

    window.setTimeout(() => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setDeletingId(null);
    }, 240);
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task))
    );
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (editText.trim() === '') return;

    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, text: editText.trim() } : task)));
    setEditingId(null);
  };

  // 2. Filter Logic: Search query ke mutabiq tasks ko filter karna
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="task-manager-container">
      <h2 className="section-title">
        <MdAssignment style={{ color: '#10b981', fontSize: '28px' }} />
        Task Management System
      </h2>
      <p className="section-subtitle">Add, complete, edit, search and remove tasks.</p>

      <div className="task-input-group">
        <input
          type="text"
          className="search-input"
          placeholder="What do you need to do?"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>
          <MdAdd style={{ fontSize: '20px' }} /> Add Task
        </button>
      </div>

      {/* 3. Search Bar (Yeh tab show hoga jab aapke paas tasks honge) */}
      {tasks.length > 0 && (
        <div className="task-input-group" style={{ marginBottom: '20px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <MdSearch style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af', fontSize: '20px' }} />
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '40px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      )}

      <div className="task-list">
        {/* 4. Ab hum 'tasks' ki jagah 'filteredTasks' par map chala rahe hain */}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const taskClass = [
              'task-item',
              task.id === newTaskId ? 'task-item--new' : '',
              task.id === deletingId ? 'task-item--delete' : ''
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div key={task.id} className={taskClass}>
                {editingId === task.id ? (
                  <>
                    <input
                      type="text"
                      className="edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <div className="task-actions">
                      <button className="icon-btn complete" onClick={() => saveEdit(task.id)} title="Save">
                        <MdSave size={20} />
                      </button>
                      <button className="icon-btn delete" onClick={() => setEditingId(null)} title="Cancel">
                        <MdCancel size={20} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="task-main" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button className="icon-btn complete" onClick={() => toggleComplete(task.id)} title="Mark complete">
                        <MdCheckCircle size={20} />
                      </button>
                      <span className={`task-text ${task.isCompleted ? 'completed' : ''}`}>
                        {task.isCompleted && <span className="task-check" style={{ marginRight: '5px' }}>✓</span>}
                        {task.text}
                      </span>
                    </div>

                    <div className="task-actions">
                      {!task.isCompleted && (
                        <button className="icon-btn edit" onClick={() => startEdit(task)} title="Edit task">
                          <MdEdit size={20} />
                        </button>
                      )}
                      <button className="icon-btn delete" onClick={() => deleteTask(task.id)} title="Delete task">
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <div className="empty-state" style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>
            {tasks.length === 0 ? "No tasks yet. Add one to begin your organized day ✨" : "No matching tasks found 🔍"}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskManager;