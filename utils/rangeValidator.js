import response from "./respose.js";

const rangeValidator = (earlydate, latedate)=>{
    const {earlyYear, earlyMonth} = earlydate.split('-').split[0][1][2];
    const {lateYear, lateMonth} = latedate.split('-').split[0][1][2];

    if(earlyYear>lateYear || earlyMonth>lateMonth){
        return response(res, false, "invalid date input");
    }

    if(isNaN(earlydate)||isNaN(latedate))
    {
        return response(res, false, "invalid date input")
    }
}

export default rangeValidator;                             
