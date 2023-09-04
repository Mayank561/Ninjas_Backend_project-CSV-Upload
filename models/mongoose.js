const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// Define the storage directory for uploaded CSV files
const uploadDirectory = path.join(__dirname, '../upload/csv'); 

// Schema for CSV
const csvSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    file: {
        type: Array
    }
}, {
    timestamps: true
});

// Storage configuration for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.csv'); 
    }
});

// Static function to upload CSV files
csvSchema.statics.uploadedcsv = multer({ 
    storage: storage, 
    // Limit the file size to 1MB
    limits: { fileSize: 1 * 1024 * 1024 }, 
    fileFilter: function(req, file, cb) {
        if (file.mimetype === 'text/csv') {
            cb(null, true);
             // Accept only CSV files
        } else {
            cb(new Error('Only CSV files are allowed'));
        }
    }
}).single('csv');

// Model for CSV
const CsvFile = mongoose.model('CsvFile', csvSchema);

module.exports = CsvFile;
