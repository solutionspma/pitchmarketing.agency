"use client";

import { useState } from "react";
import DashboardCard from "@/components/admin/DashboardCard";

// Demo data for Kanban board
const initialColumns = [
  {
    id: "backlog",
    title: "Backlog",
    cards: [
      { id: "1", title: "Design homepage mockup", description: "Create wireframes and final design" },
      { id: "2", title: "Set up Stripe integration", description: "Connect payment processing" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: "3", title: "Build API routes", description: "Create all necessary endpoints" },
    ],
  },
  {
    id: "review",
    title: "Review",
    cards: [],
  },
  {
    id: "completed",
    title: "Completed",
    cards: [
      { id: "4", title: "Project setup", description: "Initialize Next.js project" },
    ],
  },
];

export default function ProjectsPage() {
  const [columns, setColumns] = useState(initialColumns);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  function addTask() {
    if (!newTaskTitle.trim()) return;

    const newCard = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: "",
    };

    setColumns((cols) =>
      cols.map((col) =>
        col.id === "backlog"
          ? { ...col, cards: [...col.cards, newCard] }
          : col
      )
    );

    setNewTaskTitle("");
    setShowAddTask(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button
          onClick={() => setShowAddTask(true)}
          className="px-4 py-2 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition"
        >
          + Add Task
        </button>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-pitch-dark p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Task</h3>
            <input
              type="text"
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full bg-pitch-black border border-white/10 p-3 rounded-lg mb-4 focus:border-pitch-gold focus:outline-none"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={addTask}
                className="flex-1 py-2 bg-pitch-gold text-black rounded-lg font-semibold"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                className="flex-1 py-2 bg-white/10 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-80 bg-pitch-dark rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{column.title}</h3>
              <span className="text-sm text-gray-400">
                {column.cards.length}
              </span>
            </div>

            <div className="space-y-3">
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-pitch-black p-4 rounded-lg border border-white/10 hover:border-pitch-gold/50 cursor-pointer transition"
                >
                  <h4 className="font-medium mb-1">{card.title}</h4>
                  {card.description && (
                    <p className="text-sm text-gray-400">{card.description}</p>
                  )}
                </div>
              ))}

              {column.cards.length === 0 && (
                <p className="text-center text-gray-500 py-4 text-sm">
                  No tasks
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
