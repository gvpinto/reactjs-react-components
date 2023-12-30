import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DropdownTest from './pages/DropdownTest';
import 'bulma/css/bulma.min.css';
import { AppProvider } from './ contexts/AppContext';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <div className='container'>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <DropdownTest />
        </AppProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
