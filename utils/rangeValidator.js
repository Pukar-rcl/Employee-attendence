import response from "./respose.js";

const rangeValidator = (earlyDate, lateDate) => {
    const start = new Date(earlyDate);
    const end = new Date(lateDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return false;
    }

    if (start > end) {
        return false;
    }

    return true;
};

export default rangeValidator;
