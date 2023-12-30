import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

const AppContext = createContext(null);
const AppDispatchContext = createContext(null);

const initialState = {
  selectedCountry: null,
  selectedState: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case AppConstants.UPDATE_SELECTED_COUNTRY:
      state.selectedCountry = action.payload;
      console.log(state.selectedCountry);
      break;

    case AppConstants.UPDATE_SELECTED_STATE:
      state.selectedState = action.payload;
      break;

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useImmerReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export function useSelectState() {
  return useContext(AppContext);
}

export function useAppDispatch() {
  return useContext(AppDispatchContext);
}

export const AppConstants = {
  UPDATE_SELECTED_COUNTRY: 'updateSelectedCountry',
  UPDATE_SELECTED_STATE: 'updateSelecteState',
};
