import React from "react";
import ClientActivePolls from "./ClientActivePolls";
import { pageMetadata } from "@/lib/data";

export const metadata = pageMetadata.activePoll;

const Page = () => {
  return <ClientActivePolls />;
};

export default Page;
