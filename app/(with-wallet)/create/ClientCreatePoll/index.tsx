// app/create/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  FiPlusCircle,
  FiTrash2,
  FiCalendar,
  FiAlertCircle,
} from "react-icons/fi";
import { createPoll } from "@/lib/hooks/usePoll";
import { BN } from "@project-serum/anchor";
import { pageMetadata } from "@/lib/data";
import { getVoteSparkProgram } from "@project/anchor";
import useAnchorProvider from "@/lib/hooks/useAnchorProvider";

export const metadata = pageMetadata.createPoll;

export default function ClientCreatePoll() {
  const router = useRouter();
  const { connected, publicKey } = useWallet();
  const provider = useAnchorProvider();
  const program = getVoteSparkProgram(provider);

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!connected) {
      setError("Please connect your wallet to create a poll");
      return;
    }

    // Validation
    if (!title.trim()) {
      setError("Please enter a poll title");
      return;
    }

    if (title.length > 280) {
      setError("Title must be 280 characters or less");
      return;
    }

    if (options.some((option) => !option.trim())) {
      setError("All options must have content");
      return;
    }

    if (options.some((option) => option.length > 280)) {
      setError("Options must be 280 characters or less");
      return;
    }

    if (!endDate) {
      setError("Please select an end date");
      return;
    }

    const endTime = new Date(endDate).getTime() / 1000;
    if (endTime <= Date.now() / 1000) {
      setError("End date must be in the future");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Generate a random poll ID (in production this should be more robust)
      const pollId = Math.floor(Math.random() * 255); // uint8 max value

      const updatedOptions = options.map((o) => {
        return { label: o, value: new BN(0) };
      });

      await createPoll(program, {
        pollId,
        creator: publicKey,
        endTime: Math.floor(endTime),
        createdAt: Math.floor(Date.now() / 1000),
        options: updatedOptions,
        title,
      });

      router.push("/active-polls");
    } catch (error: any) {
      console.error({ error });
      setError("Failed to create poll: " + error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-indigo-800/40 backdrop-blur-sm rounded-lg p-8 border border-indigo-700/50">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Create a New Poll
        </h1>

        {!connected && (
          <div className="mb-6 py-3 px-4 bg-yellow-500/20 text-yellow-200 rounded flex items-center">
            <FiAlertCircle className="mr-2" />
            <span>Connect your wallet to create a poll</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-indigo-200 mb-2">
              Poll Title <span className="text-pink-400">*</span>
            </label>
            <input
              type="text"
              id="title"
              minLength={10}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your question..."
              maxLength={280}
              className="w-full p-3 bg-indigo-900/50 border border-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              required
            />
            <div className="mt-1 text-right text-indigo-300 text-sm">
              {title.length}/280
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-indigo-200 mb-2">
              Poll Options <span className="text-pink-400">*</span>
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex mb-3">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  minLength={10}
                  maxLength={280}
                  className="flex-grow p-3 bg-indigo-900/50 border border-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="ml-2 p-3 bg-red-600 hover:bg-red-700 rounded-md transition"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>
            ))}

            {options.length < 4 && (
              <button
                type="button"
                onClick={addOption}
                className="flex items-center text-purple-400 hover:text-purple-300 transition"
              >
                <FiPlusCircle className="mr-2" />
                Add Option ({options.length}/4)
              </button>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="endDate" className="block text-indigo-200 mb-2">
              End Date <span className="text-pink-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-400">
                <FiCalendar />
              </div>
              <input
                type="datetime-local"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 pl-10 bg-indigo-900/50 border border-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                required
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!connected || isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-md transition-all duration-200 font-medium flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Poll"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/active-polls")}
              className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
