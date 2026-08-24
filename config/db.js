import mongoose from "mongoose";
import logger from "./logger";

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.mongo)
        logger.info("Mongo db connected")
    }catch(error){
        logger.error(`mongo error ${error}`)
    }
    
}

export default connectDb;