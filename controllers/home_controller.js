const csvFile = require('../models/mongoose');
const fs = require('fs');
const path = require('path');
const parse = require('papaparse');

// render home
module.exports.homePage = async (req, res) => {
    try {
        let files = await csvFile.find({});
        res.render('home', {
            title: 'csv Upload | Home',
            files: files
        });
    } catch (err) {
        console.error("Error:", err);
        req.flash('error', 'Something went wrong');
        return res.render('servererror');
    }
};

// create parse
module.exports.uploadeFile = (req, res) => {
    csvFile.uploadedcsv(req, res, async function(err){
    try {
            if (err) {
                console.error("Error:", err);
                req.flash('error', 'Error uploading CSV');
                return res.redirect('back');
            }

            let csvfile = await csvFile.findOne({ name: req.file.originalname });
            if (csvfile) {
                req.flash('error', 'CSV already exists!')
                return res.redirect('back');
            }

            // parsing csv
            const csvFilePath = req.file.path;
            const csvData = fs.readFileSync(csvFilePath, 'utf8');

            const parsedData = parse.parse(csvData, {
                header: false
            });

            // Check if the file is a CSV
            if (req.file && req.file.mimetype === 'text/csv') {
                // Insert the converted JSON to the database
                await csvFile.create({
                    name: req.file.originalname,
                    file: parsedData.data
                });

                req.flash('success', 'CSV uploaded successfully');
                return res.redirect('back');
            } else {
                req.flash('error', 'Only CSV files are allowed');
                return res.redirect('back');
            }
        } catch (err) {
            console.error("Error:", err);
            req.flash('error', 'Something went wrong');
            return res.render('servererror');
        }
    });
};

// display csv data
module.exports.displayCsv = async (req, res) => {
    try {
        let displayData = await csvFile.findById(req.params.id);
        return res.render('table', {
            title: 'CSV Upload | Details',
            file: displayData.name,
            keys: displayData.file[0],
            results: displayData.file
        });
    } catch (err) {
        console.error("Error:", err);
        req.flash('error', 'Something went wrong');
        return res.render('servererror');
    }
};

// delete csv from db
module.exports.deletecsv = async (req, res) => {
    try {
        let deleteCSV = await csvFile.findByIdAndDelete(req.params.id);
        req.flash('success', 'CSV removed successfully');
        return res.redirect('back');
    } catch (err) {
        console.error("Error:", err);
        req.flash('error', 'Something went wrong');
        return res.render('servererror');
    }
};
