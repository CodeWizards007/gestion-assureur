//Connection file to mongo db
const mongoose = require('mongoose')
const logger = require('./Logger')
const connectDB = async () => {
    try {
        const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongodb`;
        const conn=await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true,
        });

        logger.info(`Mongodb Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        process.exit();
    }
}

module.exports = connectDB;
