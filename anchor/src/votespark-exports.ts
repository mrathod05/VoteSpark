// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import VoteSparkIDL from "../target/idl/vote_spark.json";

// Re-export the generated IDL and type
export { VoteSparkIDL };

// The programId is imported from the program IDL.
export const VOTE_SPARK_PROGRAM_ID = new PublicKey(VoteSparkIDL.address);

export function getVoteSparkProgram(provider: AnchorProvider) {
  return new Program(VoteSparkIDL, provider);
}
