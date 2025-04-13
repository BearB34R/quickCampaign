"use client";

import { useState } from "react";
import { RocketPencil } from "../components/SVG";
import { generateCampaign } from "../actions/campaign";
import ReactMarkdown from "react-markdown";

export default function Form() {
  const [formData, setFormData] = useState({
    theme: "",
    players: 4,
    difficulty: "medium",
  });
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCampaign("");

    try {
      const result = await generateCampaign(formData);
      setCampaign(result.campaign);
    } catch (err) {
      setError(
        "An error occurred while generating the campaign. Please try again.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-8 flex items-center">
          <h1 className="text-4xl font-bold text-white">Campaign Settings</h1>
          <div className="transform transition-transform hover:rotate-45">
            <RocketPencil />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-8 rounded-xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="space-y-2">
            <label
              htmlFor="theme"
              className="block text-sm font-medium text-white"
            >
              Campaign Theme
            </label>
            <input
              type="text"
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={(e) =>
                setFormData({ ...formData, theme: e.target.value })
              }
              placeholder="e.g., Fantasy, Sci-fi, Horror"
              className="w-full rounded-lg border-0 bg-white/10 p-3 text-white placeholder-white/50 backdrop-blur-sm transition-all focus:ring-2 focus:ring-white/50 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="players"
              className="block text-sm font-medium text-white"
            >
              Number of Players
            </label>
            <input
              type="number"
              id="players"
              name="players"
              min="1"
              max="8"
              value={formData.players}
              onChange={(e) =>
                setFormData({ ...formData, players: Number(e.target.value) })
              }
              className="w-full rounded-lg border-0 bg-white/10 p-3 text-white placeholder-white/50 backdrop-blur-sm transition-all focus:ring-2 focus:ring-white/50 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium text-white"
            >
              Campaign Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({ ...formData, difficulty: e.target.value })
              }
              className="w-full rounded-lg border-0 bg-white/10 p-3 text-white backdrop-blur-sm transition-all focus:ring-2 focus:ring-white/50 focus:outline-none"
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
            disabled={loading}
            className="w-full transform rounded-lg bg-white/20 p-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating Campaign..." : "Generate Campaign"}
          </button>
        </form>

        {error && (
          <div className="mt-8 w-full max-w-md rounded-lg bg-red-500/10 p-4 text-red-200">
            {error}
          </div>
        )}

        {campaign && (
          <div className="mt-8 w-full rounded-lg border border-white/20 bg-white/10 p-6 text-white backdrop-blur-xl">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-4 text-2xl font-bold text-white">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mt-4 mb-3 text-xl font-semibold text-white/90">
                    {children}
                  </h2>
                ),
                p: ({ children }) => (
                  <p className="mb-2 text-white/80">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 ml-4 list-disc space-y-1 text-white/80">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="text-white/80">{children}</li>
                ),
              }}
            >
              {campaign}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
