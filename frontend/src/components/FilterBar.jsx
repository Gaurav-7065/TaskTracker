import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';

export default function FilterBar({ filter, onFilterChange, sort, onSortChange }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 transition-colors duration-200">
      
      <div className="flex flex-wrap items-center gap-5">
        
        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            <Filter size={14} />
            <span>Filter:</span>
          </div>
          
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-700/70"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            <ArrowUpDown size={14} />
            <span>Sort By:</span>
          </div>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-700/70"
          >
            <option value="newest">Newest First</option>
            <option value="dueDate">By Due Date</option>
          </select>
        </div>

      </div>

      <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium tracking-wide italic hidden sm:block">
        Live syncing active
      </div>

    </div>
  );
}