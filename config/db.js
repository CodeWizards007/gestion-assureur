//Connection file to mongo db
const mongoose = require('mongoose')
const logger = require('./Logger')
const connectDB = async () => {
    try {
        const uri = process.env.NODE_ENV==='development' ? `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CONTAINER_NAME}`;
        const conn=await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true,
        });

        logger.info(`Mongodb Connected on  ${conn.connection.host}:${conn.connection.port}`);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        process.exit();
    }
}

module.exports = connectDB;
