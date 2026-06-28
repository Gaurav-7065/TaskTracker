import React from 'react';
import { Calendar, Pencil, Trash2 } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  
  const priorityStyles = {
    high: {
      border: 'border-l-rose-500',
      bg: 'hover:bg-rose-50/30 dark:hover:bg-rose-950/10',
      dot: 'bg-rose-500'
    },
    medium: {
      border: 'border-l-amber-500',
      bg: 'hover:bg-amber-50/30 dark:hover:bg-amber-950/10',
      dot: 'bg-amber-500'
    },
    low: {
      border: 'border-l-slate-300 dark:border-l-slate-700',
      bg: 'hover:bg-slate-50/30 dark:hover:bg-slate-800/20',
      dot: 'bg-slate-400 dark:bg-slate-500'
    }
  };

  const statusBadges = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/40',
    'in-progress': 'bg-indigo-50 text-indigo-700 border-indigo-200/60 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/40',
    done: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/40'
  };

  const isOverdue = () => {
    if (!task.dueDate || task.status === 'done') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < today;
  };

  const overdue = isOverdue();
  const currentStyle = priorityStyles[task.priority] || priorityStyles.low;

  return (
    <div className={`group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 ${currentStyle.border} ${currentStyle.bg} p-5 rounded-xl shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-0.5 flex items-start justify-between gap-4`}>
      
      {/* Left Content Area */}
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div className="pt-1 shrink-0">
          <input
            type="checkbox"
            checked={task.status === 'done'}
            onChange={() => onToggleStatus && onToggleStatus(task)}
            className="h-5 w-5 rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-indigo-600 focus:ring-indigo-500/30 transition cursor-pointer checked:bg-indigo-600 dark:checked:bg-indigo-600"
          />
        </div>

        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className={`font-semibold text-slate-900 dark:text-white text-base tracking-tight transition-all duration-200 ${task.status === 'done' ? 'line-through text-slate-400/80 dark:text-slate-500/80' : ''}`}>
              {task.title}
            </h3>
            
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border uppercase tracking-wider ${statusBadges[task.status] || 'bg-slate-100 dark:bg-slate-800'}`}>
              {task.status.replace('-', ' ')}
            </span>
          </div>

          {task.description && (
            <p className={`text-sm leading-relaxed max-w-2xl line-clamp-2 pr-4 transition-all ${task.status === 'done' ? 'text-slate-400/70 dark:text-slate-500/70' : 'text-slate-600 dark:text-slate-400'}`}>
              {task.description}
            </p>
          )}

          {/* Metadata Flags */}
          <div className="flex items-center gap-4 pt-1 flex-wrap text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300 capitalize">
              <span className={`h-2 w-2 rounded-full ${currentStyle.dot}`} />
              {task.priority} Priority
            </div>

            {task.dueDate && (
              <div className={`flex items-center gap-1.5 font-medium ${overdue ? 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30 px-2 py-0.5 rounded-md' : 'text-slate-500 dark:text-slate-400'}`}>
                <Calendar size={14} />
                <span>
                  {overdue ? 'Overdue: ' : 'Due '}
                  {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Panel */}
      <div className="flex items-center gap-1 shrink-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button
          onClick={() => onEdit(task)}
          title="Edit Task"
          className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => {
            if (window.confirm('Delete this task permanently?')) onDelete(task._id);
          }}
          title="Delete Task"
          className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition"
        >
          <Trash2 size={16} />
        </button>
      </div>

    </div>
  );
}