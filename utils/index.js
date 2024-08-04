const resWrapper = (message, status, data, error = null) => {
    if (error) {
        return {
            message,
            status,
            error
        }
    }

    return {
        message,
        status,
        data
    }
};


module.exports = { resWrapper }