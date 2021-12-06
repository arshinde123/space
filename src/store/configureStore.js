import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import api from "./middleware/api";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
	return configureStore({
		reducer,
		middleware: getDefaultMiddleware => [
			...getDefaultMiddleware(),
			logger("console"),
			api,
		]
	});
}
