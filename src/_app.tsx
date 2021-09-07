import React from "react";
import { Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";

import Application from "./components/Application";
import injectGlobalStyles from "./common/globalStyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <>
      <Global styles={injectGlobalStyles()} />
      <QueryClientProvider client={queryClient}>
        <Application />
      </QueryClientProvider>
    </>
  );
};

export default App;
