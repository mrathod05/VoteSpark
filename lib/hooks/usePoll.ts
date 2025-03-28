"use client";

import { useEffect, useState } from "react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import useLoader from "./useLoader";
import useAnchorProvider from "./useAnchorProvider";
import { VOTE_SPARK_PROGRAM_ID, getVoteSparkProgram } from "@project/anchor";

const usePoll = () => {
  const { loader, handleLoading } = useLoader(true);
  const provider = useAnchorProvider();
  const program = getVoteSparkProgram(provider);

  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    const getPolls = async () => {
      try {
        const fetchedPolls = await fetchPolls(program);

        setPolls(fetchedPolls as Poll[]);
      } catch (error) {
        console.error("Failed to fetch polls:", error);
      } finally {
        handleLoading(false);
      }
    };

    getPolls();
  }, []);

  return {
    polls,
    loading: loader,
  };
};

// Utility function to find poll address
export const findPollAddress = (creator: PublicKey, pollId: number) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("poll"),
      new PublicKey(creator).toBuffer(),
      Buffer.from([pollId]),
    ],
    VOTE_SPARK_PROGRAM_ID
  );
  return pda;
};

// Utility function to find poll address
export const findVoteAddress = ({
  user,
  creator,
  pollId,
}: {
  user: PublicKey;
  creator: PublicKey;
  pollId: number;
}) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("vote"),
      new PublicKey(user).toBuffer(),
      new PublicKey(creator).toBuffer(),
      Buffer.from([pollId]),
    ],
    VOTE_SPARK_PROGRAM_ID
  );
  return pda;
};

// Utility function to fetch all polls
export const fetchPolls = async (program: any) => {
  if (!program) {
    return [];
  }

  try {
    const polls = await program.account.poll.all();
    return polls.map((poll: any) => poll.account);
  } catch (error) {
    console.error("Error fetching polls:", error);
    throw error;
  }
};

// Utility function to get a specific poll
export const getPoll = async ({
  program,
  creator,
  pollId,
}: {
  program: any;
  creator: PublicKey;
  pollId: Poll["pollId"];
}) => {
  if (!program) {
    return null;
  }

  try {
    const pollAddress = findPollAddress(creator, pollId);
    const poll = await program.account.poll.fetch(pollAddress);
    return poll;
  } catch (error) {
    console.error("Error fetching poll:", error);
    throw error;
  }
};

// Utility function to create a new poll
export const createPoll = async (program: any, data: Poll) => {
  if (!program) {
    return;
  }

  const { pollId, creator, title, options, createdAt, endTime } = data;
  try {
    // Get the PDA for the poll
    const pollAddress = findPollAddress(creator, pollId);

    // Send transaction
    await program.methods
      .initializePoll(
        pollId,
        new BN(endTime),
        new BN(createdAt),
        options,
        title
      )
      .accounts({
        creator,
        poll: pollAddress,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return pollAddress;
  } catch (error) {
    console.error("Error creating poll:", error);
    throw error;
  }
};

// Utility function to remove a poll
export const removePoll = async ({
  program,
  pollId,
  creator,
}: {
  program: any;
  creator: PublicKey;
  pollId: number;
}) => {
  if (!program) {
    return;
  }

  try {
    // Get the PDA for the poll
    const pollAddress = findPollAddress(creator, pollId);

    // Send transaction
    await program.methods
      .removePoll(pollId)
      .accounts({
        creator,
        poll: pollAddress,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return true;
  } catch (error) {
    console.error("Error removing poll:", error);
    throw error;
  }
};

// Utility function to vote on a poll
export const votePoll = async ({
  program,
  creator,
  user,
  pollId,
  optionIndex,
}: {
  program: any;
  creator: PublicKey;
  user: PublicKey;
  pollId: number;
  optionIndex: number;
}) => {
  try {
    // Get the PDA for the poll
    const pollAddress = findPollAddress(creator, pollId);

    // Get the PDA for the vote
    const voteAddress = findVoteAddress({ user, creator, pollId });

    // Vote Poll
    await program.methods
      .votePoll(pollId, optionIndex)
      .accounts({
        user,
        poll: pollAddress,
        vote: voteAddress,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  } catch (error) {
    console.error("Error voting poll:", error);
    throw error;
  }
};

export default usePoll;
