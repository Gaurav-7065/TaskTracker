import React from 'react';
import { ClipboardList } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50/40 dark:bg-slate-900/40 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg mx-auto my-8 transition-colors duration-200">
        
        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm text-slate-400 dark:text-slate-500 mb-4">
          <ClipboardList size={24} />
        </div>

        <h3 className="text-slate-800 dark:text-slate-200 font-semibold text-base mb-1">No tasks found</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs leading-relaxed">
          Your pipeline is clear! Click <span className="font-medium text-slate-700 dark:text-slate-300">+ Add Task</span> to get started and keep things tracking smoothly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}