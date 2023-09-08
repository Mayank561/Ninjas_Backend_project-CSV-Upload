const mongoose = require("mongoose");
require('dotenv').config();


//  mongoose Connection
mongoose.connect(process.env.MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");
})
.catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

module.exports = mongoose;

