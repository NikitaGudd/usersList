import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "@/pages/HomePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-200 ">
        <HomePage />
      </div>
    </QueryClientProvider>
  );
};

export default App;
