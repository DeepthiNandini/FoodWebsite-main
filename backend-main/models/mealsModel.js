const mongoose = require('mongoose');

const mealsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
    },
    image:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Meals', mealsSchema);