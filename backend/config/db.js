const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDb connected: ${conn.connection.host}`.cyan.
        underline);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = "mongodb+srv://piper:Ben41315242@cluster0.btdbhli.mongodb.net?retryWrites=true&w=majority";
// const client = new MongoClient(uri,
//     {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     });

module.exports = connectDB