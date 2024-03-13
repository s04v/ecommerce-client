import { configureStore } from "@reduxjs/toolkit";
import filterReducer from './FilterSlice';
export const store = configureStore({
	reducer: {
		filter: filterReducer
	},
	devTools: true,
});