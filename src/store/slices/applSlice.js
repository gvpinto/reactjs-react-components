import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  selectedCountry: null,
  selectedState: null,
};

const applSlice = createSlice({
  name: 'appl',
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

const selectSelectedCountry = (state) => state.appl.selectedCountry;
const selectSelectedState = (state) => state.appl.selectedState;

// const selectSelectedCountry
export const { updateSelectedCountry, updateSelectedState } = applSlice.actions;

export const selectApplState = createSelector(
  [selectSelectedCountry, selectSelectedState],
  (selectedCountry, selectedState) => ({
    selectedCountry,
    selectedState,
  }),
);

export default applSlice.reducer;
