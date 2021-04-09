
const isDate = (str) => {
    return 'string' === typeof str && (dt = new Date(str)) && !isNaN(dt) && str === dt.toISOString().substr(0, 10);
}

const validateDate = (value) => {
    if (value === null || value === undefined) {
        throw new ReferenceError("No value passed");
    }
    if (!isDate(value)) {
        throw new Error('Date is not in correct format (correct format: YYYY-MM-DD)');
    }
    return true;
}

const validateCount = (value) => {
    if (isNaN(value)) {
        throw new Error('expecting integer input');
    }
    if (value === null || value === undefined) {
        throw new ReferenceError("No value passed");
    }
    if (value < 0) {
        throw new Error('Number is not positive');
    }
    return true;
}


module.exports = {
    isDate,
    validateCount,
    validateDate
}