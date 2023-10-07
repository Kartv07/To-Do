import mongoose from "mongoose";

const connectDB  = async () =>{
    try {
       await mongoose.connect("mongodb+srv://kartavyadev07:rYXE9ITgKeX4k9JV@cluster0.5xovl59.mongodb.net/?retryWrites=true&w=majority");
       console.log("MongoDB Connected !");
    } catch (error) {
        console.log(new Error ("Connection failed !"))
    }
}

export default connectDB;