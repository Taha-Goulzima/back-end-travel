const mongoose = require('mongoose');

function connection(){
    mongoose.connect('mongodb://localhost:27017/travelDB')
    .then(()=>console.log('Connected to MongoDB'))
    .catch((e)=>console.log('Error connecting to MongoDB' + e))
}

module.exports = connection;