"use client";
import React from "react";
import { FiBarChart2, FiCheckCircle } from "react-icons/fi";

const PollVoteBreakdown: React.FC<{ poll: Poll }> = ({ poll }) => {
  // Calculate percentages for each option
  const optionsWithPercentages = poll.options.map((option) => {
    // Convert bigint to number for percentage calculation
    const totalVotes = poll.options.reduce(
      (sum, opt) => sum + Number(opt.value),
      0
    );

    return {
      ...option,
      percentage:
        totalVotes > 0 ? (Number(option.value) / totalVotes) * 100 : 0,
    };
  });

  // Sort options by votes in descending order
  const sortedOptions = [...optionsWithPercentages].sort(
    (a, b) => Number(b.value) - Number(a.value)
  );

  // Calculate total votes
  const totalVotes = sortedOptions.reduce(
    (sum, option) => sum + Number(option.value),
    0
  );

  return (
    <div className="bg-indigo-900/30 rounded-lg p-6 border border-indigo-700/50 text-center text-indigo-300">
      <div className="flex items-center mb-4">
        <FiBarChart2 className="mr-2 text-xl text-blue-500" />
        <h2 className="text-lg font-semibold">Vote Breakdown</h2>
      </div>

      <div className="mb-2">
        <span className="font-medium">Total Votes:</span> {totalVotes}
      </div>

      <div className="space-y-2">
        {sortedOptions.map((option, index) => (
          <div key={`${option.label}-${index}`} className="flex items-center">
            <div className="flex-grow flex items-center">
              <span className="font-medium">{option.label}</span>
            </div>
            <div className="text-right">
              <span>
                {option.value.toString()} votes (
                {option.percentage?.toFixed(1) || 0}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      {sortedOptions.length > 0 && (
        <div className="mt-4 flex items-center text-green-600">
          <FiCheckCircle className="mr-2" />
          <span>Leading Option: {sortedOptions[0].label}</span>
        </div>
      )}
    </div>
  );
};

export default PollVoteBreakdown;
