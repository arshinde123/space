import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
	name: "token",
	initialState: {
		value: "",
		loading: false,
	},
	reducers: {
		tokenRequested: (token, action) => {
			token.loading = true;
		},
		tokenReceived: (token, action) => {
			token.value = action.payload.token;
			token.loading = false;
		},
		tokenRequestFailed: (token, action) => {
			token.loading = false;
		},
	},
});

const { tokenReceived, tokenRequested, tokenRequestFailed } = slice.actions;
export default slice.reducer;

// Action Creators
export const getToken = () => (dispatch, getState) => {
	dispatch(
		apiCallBegan({
			url: "/token",
			method: "post",
			headers: { Accept: "application/json" },
			onStart: tokenRequested.type,
			onSuccess: tokenReceived.type,
			onError: tokenRequestFailed.type,
		})
	);
};

// Selectors
export const getAuthorizationToken = createSelector(
	state => state.authorization.token,
	token => token
);
