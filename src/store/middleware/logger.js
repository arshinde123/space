const logger = ({ logActions }) => (store) => (next) => (action) => {
    if (logActions)
        console.log('Logging action:', action);
    return next(action);
};

export default logger;
