import mongoose from "mongoose";
import logger from "./logger.js";

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.mongo)
        logger.info("Mongo db connected")
    }catch(error){
        logger.error(`mongo error ${error}`)
        process.exit(1);
    }
    
}

export default connectDb;