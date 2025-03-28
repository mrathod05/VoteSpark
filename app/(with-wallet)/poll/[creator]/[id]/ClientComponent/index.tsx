"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { FiClock, FiUser, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import {
  findVoteAddress,
  getPoll,
  removePoll,
  votePoll,
} from "@/lib/hooks/usePoll";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import useLoader from "@/lib/hooks/useLoader";
import Loading from "@/lib/components/Loading";
import useAnchorProvider from "@/lib/hooks/useAnchorProvider";
import { getVoteSparkProgram } from "@project/anchor";

type Prop = {
  creatorAddress: string;
  pollId: number;
};

const ClientComponent = ({ pollId, creatorAddress }: Prop) => {
  const newCreatorAddress = new PublicKey(creatorAddress);

  const router = useRouter();
  const { connected, publicKey } = useWallet();
  const { loader, handleLoading } = useLoader(true);
  const provider = useAnchorProvider();
  const program = getVoteSparkProgram(provider);

  const [poll, setPoll] = useState<Poll>();
  const [selectedOption, setSelectedOption] = useState<number>();
  const [isVoting, setIsVoting] = useState(false);
  const [isRemovingPoll, setIsRemovingPoll] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!program) {
      return;
    }

    const fetchPollDetails = async () => {
      try {
        const pollData = await getPoll({
          program,
          creator: newCreatorAddress,
          pollId,
        });

        setPoll(pollData as Poll);
      } catch (error) {
        setError("Failed to load poll details");
        console.error(error);
      } finally {
        handleLoading(false);
      }
    };

    fetchPollDetails();
  }, [creatorAddress, pollId, program]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const isPollActive = () => {
    if (!poll) return false;
    return Date.now() / 1000 < poll.endTime;
  };

  const isCreator = () => {
    if (!connected || !publicKey || !poll) return false;
    return publicKey.toString() === poll.creator.toString();
  };

  const handleVote = async () => {
    if (!connected) {
      setError("Please connect your wallet to vote");
      return;
    }

    if (selectedOption !== 0 && !selectedOption) {
      setError("Please select an option");
      return;
    }

    const voteAddress = findVoteAddress({
      user: publicKey!,
      creator: poll?.creator,
      pollId,
    });

    const accountInfo = await program?.provider.connection.getAccountInfo(
      voteAddress
    );

    if (accountInfo) {
      setError("You have already voted in this poll");
      setIsVoting(false);
      return;
    }

    setIsVoting(true);
    setError("");
    setSuccess("");

    try {
      await votePoll({
        program,
        user: publicKey!,
        creator: poll?.creator.toString(),
        pollId,
        optionIndex: selectedOption,
      });
      setSuccess("Your vote has been recorded!");
      router.replace("/active-polls");
    } catch (error: any) {
      console.error({ error });
      setError("Failed to submit vote");
    } finally {
      setIsVoting(false);
    }
  };

  const handleRemovePoll = async () => {
    if (!isCreator()) {
      setError("Only the creator can remove this poll");
      return;
    }

    setIsRemovingPoll(true);
    setError("");
    setSuccess("");

    try {
      await removePoll({ program, creator: newCreatorAddress, pollId });
      setSuccess("Poll removed successfully");
      setTimeout(() => {
        router.push("/active-polls");
      }, 2000);
    } catch (error: any) {
      console.error({ error });
      setError("Failed to remove poll");
    } finally {
      setIsRemovingPoll(false);
    }
  };

  if (loader && !poll) {
    return <Loading />;
  }

  if (!poll) {
    return (
      <div className="text-center py-16 bg-indigo-800/30 rounded-lg border border-indigo-700">
        <h3 className="text-xl font-medium mb-4">Poll not found</h3>
        <button
          onClick={() => router.push("/active-polls")}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition"
        >
          Back to Polls
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-indigo-800/40 backdrop-blur-sm rounded-lg p-8 border border-indigo-700/50">
        <h1 className="text-3xl font-bold mb-6 text-white">{poll.title}</h1>

        <div className="flex justify-between items-center mb-6 text-indigo-300">
          <div className="flex items-center">
            <FiClock className="mr-2" />
            <span>
              {isPollActive()
                ? `Ends: ${formatDate(poll.endTime)}`
                : `Ended: ${formatDate(poll.endTime)}`}
            </span>
          </div>
          <div className="flex items-center">
            <FiUser className="mr-2" />
            <span>
              {poll.creator.toString().substring(0, 6)}...
              {poll.creator
                .toString()
                .substring(poll.creator.toString().length - 6)}
            </span>
          </div>
        </div>

        {!isPollActive() && (
          <div className="mb-6 py-3 px-4 bg-yellow-500/20 text-yellow-200 rounded flex items-center">
            <FiAlertCircle className="mr-2" />
            <span>This poll has ended</span>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Options</h2>
          <div className="space-y-3">
            {poll.options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left p-4 rounded-md transition duration-200 flex items-center
                    ${
                      selectedOption === index
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "bg-indigo-900/50 border-indigo-800 hover:bg-indigo-800/50 text-indigo-100"
                    } 
                    border`}
                onClick={() => setSelectedOption(index)}
                disabled={!isPollActive() || !connected}
              >
                <div
                  className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center border
                    ${
                      selectedOption === index
                        ? "border-white bg-purple-500"
                        : "border-indigo-400 bg-transparent"
                    }`}
                >
                  {selectedOption === index && (
                    <FiCheckCircle className="text-white" />
                  )}
                </div>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 text-green-200 rounded flex items-center">
            <FiCheckCircle className="mr-2" />
            <span>{success}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          {!isCreator() && isPollActive() && connected && (
            <button
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-md transition-all duration-200 font-medium flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleVote}
              disabled={selectedOption === null || isVoting}
            >
              {isVoting ? "Voting..." : "Submit Vote"}
            </button>
          )}

          {isCreator() && (
            <button
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleRemovePoll}
              disabled={isRemovingPoll}
            >
              {isRemovingPoll ? "Removing..." : "Remove Poll"}
            </button>
          )}

          <button
            className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 rounded-md transition"
            onClick={() => router.push("/active-polls")}
          >
            Back to Polls
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientComponent;
