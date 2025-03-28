type PollOption = {
  label: string;
  value: bigint;
};

type Poll = {
  creator: PublicKey;
  pollId: number;
  title: string;
  options: PollOption[];
  createdAt: number;
  endTime: number;
};
