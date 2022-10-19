const eurekaHelper = require('./config/Eureka.config');
const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const logger = require("./config/Logger");
const connectDB = require("./config/db");
const AssureurRoute = require("./routes/Assureur.route");
const { errorLogger,errorResponder, invalidPathHandler } = require("./middleware/ErrorHandler");
// Error Handling middlewares
const app = express(); // main thing
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);
dotenv.config();
app.use(express.json()); // to accept json data

connectDB().then(()=>{
    logger.info("mongoDB connected ")
})
// cors config
const allowedOrigins = ["http://localhost:3000", "http://192.168.10.62:3000"];
app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials:true,
        optionSuccessStatus:200,
    })
);
app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
    res.send("API is running...");
});


app.use(express.static("public"));
app.use("/api/assureur",AssureurRoute)
app.use("/api/devis",require("./routes/Devis.route"));
app.use("/api/constat",require("./routes/Constats.route"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, logger.info(`Server started on Port ${PORT}`));
//eurekaHelper.registerWithEureka('assureur-service', PORT);