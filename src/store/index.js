import { configureStore } from '@reduxjs/toolkit';
import applReducer from './slices/applSlice';

export default configureStore({ reducer: { appl: applReducer } });
