import { createMemoryHistory } from "history";
import { QueryClient, QueryClientProvider, } from "react-query";
import { Router } from "react-router-dom";

interface ITestingProvidersProps {
  children: React.ReactNode;
  history: any;
}

const queryClient = new QueryClient();
const defaultHistory = createMemoryHistory();

const TestingProviders = ({ children, history }: ITestingProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>{children}</Router>
    </QueryClientProvider>
  );
};

TestingProviders.defaultProps = {
  history: defaultHistory,
};

export default TestingProviders;
