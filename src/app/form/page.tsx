"use client";

import { useState } from "react";
import { RocketPencil } from "../components/SVG";

export default function Form() {
  const [formData, setFormData] = useState({
    theme: "",
    players: 4,
    difficulty: "medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-3xl font-bold">Campaign Settings</h1>
        <RocketPencil />
      </div>
      
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="space-y-2">
          <label htmlFor="theme" className="block text-sm font-medium">
            Campaign Theme
          </label>
          <input
            type="text"
            id="theme"
            name="theme"
            value={formData.theme}
            onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
            placeholder="e.g., Fantasy, Sci-fi, Horror"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="players" className="block text-sm font-medium">
            Number of Players
          </label>
          <input
            type="number"
            id="players"
            name="players"
            min="1"
            max="8"
            value={formData.players}
            onChange={(e) => setFormData({ ...formData, players: Number(e.target.value) })}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="difficulty" className="block text-sm font-medium">
            Campaign Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generate Campaign
        </button>
      </form>
    </div>
  );
}