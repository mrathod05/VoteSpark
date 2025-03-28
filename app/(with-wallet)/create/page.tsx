import { pageMetadata } from "@/lib/data";

export const metadata = pageMetadata.createPoll;

import React from "react";
import ClientCreatePoll from "./ClientCreatePoll";

const Page = () => {
  return <ClientCreatePoll />;
};

export default Page;
