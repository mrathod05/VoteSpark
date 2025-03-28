"use client";

import Link from "next/link";
import { FiClock, FiUser, FiArrowRight, FiBarChart2 } from "react-icons/fi";
import { useWallet } from "@solana/wallet-adapter-react";

import CreatePollButton from "@/lib/components/CreatePollButton";
import usePoll from "@/lib/hooks/usePoll";
import Loading from "@/lib/components/Loading";
import PollVoteBreakdown from "@/lib/components/PollVoteBreakdown";
import { useState } from "react";

export default function ClientActivePolls() {
  const { connected } = useWallet();
  const { polls, loading } = usePoll();
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const isPollActive = (endTime: number) => {
    return Date.now() / 1000 < endTime;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Active Polls
          <span className="ml-3 text-lg text-indigo-300">
            ({polls.length} available)
          </span>
        </h1>
        {connected && <CreatePollButton />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {loading ? (
            <Loading />
          ) : !polls.length ? (
            <div className="text-center py-16 bg-indigo-800/30 rounded-lg border border-indigo-700">
              <h3 className="text-xl font-medium mb-4">No polls available</h3>
              {connected ? (
                <p>Create the first poll to get started!</p>
              ) : (
                <p>Connect your wallet to create polls</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {polls.map((poll: Poll, index) => (
                <div
                  key={`${poll.creator.toString()}-${poll.pollId}-${index}`}
                  className="group"
                >
                  <Link
                    href={`/poll/${poll.creator.toString()}/${poll.pollId}`}
                    className="block"
                  >
                    <div className="bg-indigo-800/40 hover:bg-indigo-800/60 backdrop-blur-sm rounded-lg p-6 border border-indigo-700/50 transition duration-200 h-full flex flex-col">
                      <h2 className="text-xl font-semibold mb-4 text-white">
                        {poll.title}
                      </h2>

                      <div className="mt-2 mb-4 text-indigo-200 flex items-center">
                        <FiBarChart2 className="mr-2" />
                        <span>{poll.options.length} options</span>
                      </div>

                      <div className="mt-auto pt-4 border-t border-indigo-700/50 flex justify-between items-center">
                        <div className="flex items-center text-indigo-300 text-sm">
                          <FiClock className="mr-1" />
                          <span>
                            {isPollActive(poll.endTime)
                              ? `Ends: ${formatDate(poll.endTime)}`
                              : "Ended"}
                          </span>
                        </div>
                        <div className="flex items-center text-purple-300 text-sm">
                          <FiUser className="mr-1" />
                          <span>
                            {poll.creator.toString().substring(0, 4)}...
                            {poll.creator
                              .toString()
                              .substring(poll.creator.toString().length - 4)}
                          </span>
                        </div>
                      </div>

                      <button
                        className="mt-4 text-right"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedPoll(poll);
                        }}
                      >
                        <span className="text-pink-400 inline-flex items-center text-sm hover:text-pink-300 transition">
                          View Details <FiArrowRight className="ml-1" />
                        </span>
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          {selectedPoll ? (
            <PollVoteBreakdown poll={selectedPoll} />
          ) : (
            <div className="bg-indigo-900/30 rounded-lg p-6 border border-indigo-700/50 text-center text-indigo-300">
              Select a poll to view vote breakdown
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
