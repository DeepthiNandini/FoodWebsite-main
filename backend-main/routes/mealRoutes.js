const express = require("express");
const router = express.Router();
const multer = require('multer');
const {createMeal, getMeals} = require('../controllers/mealsController')

const upload = multer({dest:'uploads/'})

router.post('/createMeal', upload.single('image'), createMeal)
router.get('/getMeals', getMeals);


module.exports = router





// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null,'./uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   },
// });

// const upload = multer({storage: storage});