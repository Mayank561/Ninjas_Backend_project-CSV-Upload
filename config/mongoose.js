const mongoose = require("mongoose");

//  mongoose Connection
mongoose.connect('mongodb://0.0.0.0:27017/backend_Csv_Upload', {
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

