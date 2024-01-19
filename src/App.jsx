import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DropdownTest from './pages/DropdownTest';
// import 'bulma/css/bulma.min.css';
import { Provider } from 'react-redux';
import store from './store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyles from '../styles/GlobalStyles';
import InputBoxTest from './pages/InputBoxTest';
import SyncTableTest from './pages/SyncTableTest';
// import { AppProvider } from './ contexts/AppContext';

// Create a client
const queryClient = new QueryClient();

// function App() {
//   return (
//     <div className='container'>
//       <QueryClientProvider client={queryClient}>
//         <AppProvider>
//           <DropdownTest />
//         </AppProvider>
//       </QueryClientProvider>
//     </div>
//   );
// }

function App() {
  // TODO: Wrap Error Boundary
  return (
    <div className='container'>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          {/* <InputBoxTest /> */}
          {/* <DropdownTest /> */}
          <SyncTableTest />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
