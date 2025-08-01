import mongoose from "mongoose";

const connectToDB  = async () => {
    console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URL);



    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    }catch(err){
        console.log(err);
    }
}

export default connectToDB