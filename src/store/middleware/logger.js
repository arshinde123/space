const logger = param => store => next => action => {
	console.log("Logging on:", param);
	next(action);
};

export default logger;
