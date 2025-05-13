import mongoose from "mongoose";

export const dbConnection = () => {
    return mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_STACK_JOB_SEEKING"
    }).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.error(`Error occurred while connecting to database: ${err}`);
        throw err;
    });
}
