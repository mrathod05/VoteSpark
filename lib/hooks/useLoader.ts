import { useState } from "react";

const useLoader = (initial: boolean) => {
  const [loader, setLoader] = useState(initial);

  const handleLoading = (state: boolean) => {
    setLoader(state);
  };

  return {
    loader,
    handleLoading,
  };
};

export default useLoader;
