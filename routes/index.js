const express  = require ('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

//console.log('Router Loaded');

//render homepage
router.get('/', homeController.homePage);

//upload CSV
router.use('/file/uploads', homeController.uploadeFile);

//view CSV File in Table format
router.use('/view/:id', homeController.displayCsv);

//delete CSV file
router.use('/delete/:id', homeController.deletecsv);

module.exports = router;