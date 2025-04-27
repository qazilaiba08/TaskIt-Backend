import mongoose from "mongoose";
import 'dotenv/config'
import chalk from "chalk";
const url = process.env.MONGODB_URL

const connectToDb= async()=>{

    try{
        await mongoose.connect(url,{dbName:"TrackIT"})
        console.log(chalk.bgGreen.white('connected to MongoDB'));
    }
    catch(error){
        console.error("error in connecting to db",error)
    }
}

export default connectToDb