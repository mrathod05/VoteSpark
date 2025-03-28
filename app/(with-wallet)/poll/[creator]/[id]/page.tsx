import { redirect } from "next/navigation";
import ClientComponent from "./ClientComponent";
import { pageMetadata } from "@/lib/data";

type Params = {
  params: Promise<{
    id: string;
    creator: string;
  }>;
};

export const metadata = pageMetadata.activePoll;

export default async function PollPage({ params }: Params) {
  const awaitedParams = await params;

  if (!awaitedParams.id || !awaitedParams.creator) {
    redirect("/active-polls");
  }

  const { id, creator } = awaitedParams;

  return <ClientComponent creatorAddress={creator} pollId={+id} />;
}
