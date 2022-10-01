//Connection file to mongo db
const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}?authSource=admin`;
        console.log(uri)
        const conn=await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true,
        });

        console.log(`Mongodb Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }
}

module.exports = connectDB;
