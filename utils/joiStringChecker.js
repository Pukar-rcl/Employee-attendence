import Joi from "joi";

export default function checkString(body){
    const schema  = Joi.string().required().valid('unapproved', 'approved');

    const {error} = schema.validate(body);

    if(error){
        return false;
    }

    return true;
}