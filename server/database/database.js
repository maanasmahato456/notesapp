const mongoose = require('mongoose');

const db = process.env.DATABASE;

mongoose.connect(db).then(() => console.log("database connected!")).catch((error)=> console.log(error, 'database not connected!'));