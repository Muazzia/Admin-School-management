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


const getQuarterDates = (quarter) => {
    let startDate, endDate;
    switch (quarter) {
        case 'Q1':
            startDate = new Date('2024-01-01');
            endDate = new Date('2024-03-31');
            break;
        case 'Q2':
            startDate = new Date('2024-04-01');
            endDate = new Date('2024-06-30');
            break;
        case 'Q3':
            startDate = new Date('2024-07-01');
            endDate = new Date('2024-09-30');
            break;
        case 'Q4':
            startDate = new Date('2024-10-01');
            endDate = new Date('2024-12-31');
            break;
        default:
            startDate = null;
            endDate = null;
    }
    return { startDate, endDate };
};

module.exports = { resWrapper, getQuarterDates }