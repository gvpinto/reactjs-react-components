import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  selectedCountry: null,
  selectedState: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateSelectedCountry(state, action) {
      state.selectedCountry = action.payload;
    },
    updateSelectedState(state, action) {
      state.selectedState = action.payload;
    },
  },
});

const selectSelectedCountry = (state) => state.app.selectedCountry;
const selectSelectedState = (state) => state.app.selectedState;

// const selectSelectedCountry
export const { updateSelectedCountry, updateSelectedState } = appSlice.actions;

// const selectAppState1 = (state) => ({
//   selectedCountry: state.app.selectedCountry,
//   selectedState: state.app.selectedState,
// });

export const selectAppState = createSelector(
  [selectSelectedCountry, selectSelectedState],
  (selectedCountry, selectedState) => ({
    selectedCountry,
    selectedState,
  }),
);

export default appSlice.reducer;
