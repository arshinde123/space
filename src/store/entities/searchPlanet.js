import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../api";

// Slice
const slice = createSlice({
	name: "planetSearch",
	initialState: {
		result: {},
		loading: false,
	},
	reducers: {
		planetSearchRequested: (planetSearch, action) => {
			planetSearch.loading = true;
		},
		planetSearched: (planetSearch, action) => {
			planetSearch.loading = false;
			planetSearch.result = action.payload;
		},
		planetSearchRequestFailed: (planetSearch, action) => {
			planetSearch.loading = false;
			planetSearch.result.status = "error";
		},
	},
});

const { planetSearchRequested, planetSearched, planetSearchRequestFailed } =
	slice.actions;

export default slice.reducer;

export const searchPlanet = data => (dispatch, getState) => {
	dispatch(
		apiCallBegan({
			url: "/find",
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			data,
			onStart: planetSearchRequested.type,
			onSuccess: planetSearched.type,
			onError: planetSearchRequestFailed.type,
		})
	);
};

// selectors
export const getSearchPlanetResult = createSelector(
	state => state.entities.searchPlanet,
	searchPlanet => searchPlanet
);
