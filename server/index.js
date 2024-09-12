
const express = require("express");
const app = express();

// const mongoose = require("mongoose");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const sessionRoutes = require("./routes/Session");
const feildRouters = require("./routes/Feilds");
const activityRouters = require("./routes/Activity");
const sourceOfStressRouters = require("./routes/SourceOfStress");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000

// connect db
const database = require("./config/database");
const cookieParser = require("cookie-parser");
database.connect();

app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use('/api/v1/session', sessionRoutes);
app.use('/api/v1/feilds', feildRouters);
app.use('/api/v1/activity',activityRouters);
app.use('/api/v1/sourceOfStress', sourceOfStressRouters);



app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})