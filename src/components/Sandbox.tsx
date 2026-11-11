import React, { useState } from 'react';
import { TaskItem } from '../types';
import { Plus, Trash2, CheckSquare, Code2, Eye } from 'lucide-react';
import { playSfx } from '../utils/sound';

export const Sandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo');
  const [filter, setFilter] = useState<'all' | 'frontend' | 'mobile' | 'servicenow'>('all');
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, text: 'Architect reusable Button & Modal UI components', tag: 'frontend', completed: true },
    { id: 2, text: 'Build cross-platform swipe gestures in React Native', tag: 'mobile', completed: false },
    { id: 3, text: 'Configure ServiceNow catalog approval workflow', tag: 'servicenow', completed: false },
    { id: 4, text: 'Integrate Vite hot module replacement & Tailwind theme', tag: 'frontend', completed: true },
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskTag, setNewTaskTag] = useState<'frontend' | 'mobile' | 'servicenow'>('frontend');

  const filteredTasks = tasks.filter(
    (t) => filter === 'all' || t.tag === filter
  );

  const activeCount = tasks.filter((t) => !t.completed).length;

  const handleToggleTask = (id: number) => {
    playSfx('click');
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: number) => {
    playSfx('click');
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    playSfx('success');
    const newTask: TaskItem = {
      id: Date.now(),
      text: newTaskText.trim(),
      tag: newTaskTag,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const tagBadgeStyle = (tag: string) => {
    switch (tag) {
      case 'frontend':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'mobile':
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
      case 'servicenow':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      default:
        return 'text-zinc-400 bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <section id="sandbox" className="px-6 sm:px-10 lg:px-16 py-20 border-b border-zinc-800/60">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="text-orange-500 font-bold text-xs uppercase tracking-widest font-mono">
            Live Component Sandbox
          </span>
          <h2 className="text-3xl font-extrabold text-white">Interactive UI Engine</h2>
          <p className="text-zinc-400 text-sm">
            Experience real-time reactive state management, TypeScript interfaces, and modular component hierarchy.
          </p>
        </div>

        {/* Outer Card */}
        <div className="figma-card p-0 overflow-hidden bg-zinc-950 border border-zinc-800">
          
          {/* Top Window Header */}
          <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-mono text-zinc-400 ml-2">TeamConnectTaskManager.tsx</span>
            </div>

            {/* Toggle Tabs */}
            <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs">
              <button
                onClick={() => { playSfx('click'); setActiveTab('demo'); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
                  activeTab === 'demo' ? 'bg-orange-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </button>
              <button
                onClick={() => { playSfx('click'); setActiveTab('code'); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
                  activeTab === 'code' ? 'bg-orange-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>TypeScript Code</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Live Demo */}
          {activeTab === 'demo' && (
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Category Filter & Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-zinc-500 mr-1">Filter:</span>
                  {(['all', 'frontend', 'mobile', 'servicenow'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { playSfx('click'); setFilter(cat); }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                        filter === cat
                          ? 'bg-orange-500 text-white font-bold'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {cat === 'all' ? 'All' : cat === 'frontend' ? 'Frontend' : cat === 'mobile' ? 'Mobile' : 'ServiceNow'}
                    </button>
                  ))}
                </div>
                <span className="text-xs font-mono text-orange-400 bg-orange-500/10 border border-orange-500/30 px-2.5 py-0.5 rounded-full">
                  {activeCount} active task{activeCount === 1 ? '' : 's'} remaining
                </span>
              </div>

              {/* Task Items List */}
              <div className="space-y-2.5 min-h-[180px]">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500 text-xs font-mono">
                    No tasks in category "{filter}". Add one below!
                  </div>
                ) : (
                  filteredTasks.map((t) => (
                    <div
                      key={t.id}
                      className={`task-item flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 transition ${
                        t.completed ? 'completed opacity-70' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={t.completed}
                          onChange={() => handleToggleTask(t.id)}
                          className="w-4 h-4 rounded border-zinc-700 text-orange-600 focus:ring-orange-500 bg-zinc-800 cursor-pointer"
                        />
                        <span className={`task-text text-xs sm:text-sm font-medium ${t.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                          {t.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${tagBadgeStyle(t.tag)}`}>
                          {t.tag}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(t.id)}
                          className="text-zinc-500 hover:text-rose-400 p-1 transition"
                          title="Delete task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Task Input Form */}
              <form onSubmit={handleAddTask} className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Add a new component or task..."
                  className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition w-full"
                />
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={newTaskTag}
                    onChange={(e) => setNewTaskTag(e.target.value as 'frontend' | 'mobile' | 'servicenow')}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-300 outline-none focus:border-orange-500"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="mobile">Mobile</option>
                    <option value="servicenow">ServiceNow</option>
                  </select>

                  <button type="submit" className="btn-orange text-xs py-2.5 px-4 shrink-0 flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Task</span>
                  </button>
                </div>
              </form>

            </div>
          )}

          {/* Tab 2: TypeScript Code */}
          {activeTab === 'code' && (
            <div className="p-6 sm:p-8">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                <pre>
                  <code>
{`import React, { useState } from 'react';

export interface TaskItem {
  id: number;
  text: string;
  tag: 'frontend' | 'mobile' | 'servicenow';
  completed: boolean;
}

export const TeamConnectTaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, text: 'Architect reusable Button & Modal UI components', tag: 'frontend', completed: true },
    { id: 2, text: 'Build cross-platform swipe gestures in React Native', tag: 'mobile', completed: false },
    { id: 3, text: 'Configure ServiceNow catalog approval workflow', tag: 'servicenow', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task.id} className="flex justify-between items-center p-3 rounded-xl bg-zinc-900">
          <span className={task.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}>
            {task.text}
          </span>
          <span className="badge">{task.tag}</span>
        </div>
      ))}
    </div>
  );
};`}
                  </code>
                </pre>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

