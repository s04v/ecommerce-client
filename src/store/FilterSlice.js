import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	categories: [],
	rate: 0,
	lowPrice: 0,
	highPrice: 0,
};

const filterSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		updateCategories: (state, action) => {
			state.categories = action.payload;
		},
		updateRate: (state, action) => {
			state.rate = action.payload;
		},
		updateLowPrice: (state, action) => {
			state.lowPrice = action.payload;
		},
		updateHighPrice: (state, action) => {
			state.highPrice = action.payload;
		},
		resetFilters: (state, action) => {
			return initialState;
		},
	},
});

export const {
	updateCategories,
	updateRate,
	updateLowPrice,
	updateHighPrice,
	resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;