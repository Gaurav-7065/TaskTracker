import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Sun, Moon, Plus, X, CheckSquare } from 'lucide-react';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('newest');
  
  // Initialize theme from localStorage, default to dark
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  // Sync theme with document class list and localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch tasks when filters or sorting change
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const params = {
          status: filter || undefined,
          sortBy: sort
        };
        const response = await getTasks(params);
        
        // Safely extract the data array out of the response payload
        const data = response?.data?.data || response?.data?.tasks || response?.data || response?.tasks || response;
        setTasks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to retrieve task data:', error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filter, sort]);

  // Derived dashboard metrics
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const handleAddTaskClick = () => {
    setEditTask(null);
    setShowForm(true);
  };

  const handleEditTaskClick = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = async (payload) => {
    const toastId = toast.loading('Saving task...');
    try {
      if (editTask) {
        const updated = await updateTask(editTask._id, payload);
        const updatedDoc = updated.data || updated;
        setTasks(tasks.map(t => t._id === editTask._id ? updatedDoc : t));
        toast.success('Task updated successfully!', { id: toastId });
      } else {
        const created = await createTask(payload);
        const createdDoc = created.data || created;
        setTasks([createdDoc, ...tasks]);
        toast.success('Task created successfully!', { id: toastId });
      }
      closeModal();
    } catch (error) {
      console.error('Error saving task:', error);
      toast.error('Could not save task.', { id: toastId });
    }
  };

  const handleToggleStatus = async (task) => {
    const nextStatus = task.status === 'done' ? 'pending' : 'done';
    try {
      const updated = await updateTask(task._id, { ...task, status: nextStatus });
      const updatedDoc = updated.data || updated;
      setTasks(tasks.map(t => t._id === task._id ? updatedDoc : t));
    } catch (error) {
      console.error('Failed to change status:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    const toastId = toast.loading('Deleting task...');
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      toast.success('Task deleted successfully!', { id: toastId });
    } catch (error) {
      console.error('Could not delete task:', error);
      toast.error('Failed to delete task.', { id: toastId });
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setEditTask(null);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      <Toaster />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <CheckSquare size={18} />
            </div>
            <h1 className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">TaskTracker</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition duration-150"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={handleAddTaskClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition duration-150 shadow-sm"
            >
              <Plus size={16} /> Add Task
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        
        {/* Metric Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Tasks', value: stats.total, color: 'text-slate-400 dark:text-slate-500' },
            { label: 'Pending', value: stats.pending, color: 'text-amber-500' },
            { label: 'In Progress', value: stats.inProgress, color: 'text-indigo-500' },
            { label: 'Completed', value: stats.done, color: 'text-emerald-500' }
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 p-4.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col">
              <span className={`text-xs font-semibold uppercase tracking-wider ${item.color}`}>{item.label}</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{item.value}</span>
            </div>
          ))}
        </section>

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sort={sort}
          onSortChange={setSort}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="h-8 w-8 rounded-full border-3 border-indigo-600/20 border-t-indigo-600 animate-spin" />
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 animate-pulse">Syncing database pipeline...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEditTaskClick}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </main>

      {/* Modal View Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden relative">
            <button
              onClick={closeModal}
              className="absolute top-4.5 right-4.5 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <X size={16} />
            </button>

            <TaskForm
              initial={editTask}
              onSubmit={handleFormSubmit}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}