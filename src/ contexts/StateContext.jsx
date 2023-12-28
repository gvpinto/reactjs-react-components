import { createContext } from 'react';

const StateContext = createContext();

const initialState = {
  countries: [],
  selectedCountry: '',
  isLoading: false,
  error: '',
};

function reducer(state, { type, payload }) {
  swtich(type) {
    case 'something': 
        return initialState;
    break;
       

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  };
}
