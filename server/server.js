const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require('./routes/auth');
const note = require('./routes/note');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // making a server port!

//app.use(cors()); // using cors module to bypass browser cors
app.use(express.json()); // using express.json to parse json


dotenv.config({ path: './config.env' }); // connecting  to database
require('./database/database');

// routes
app.use('/auth', auth.routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/note', note.routes);
app.listen(PORT, () => {
    console.log(`server running at PORT: http://localhost:${PORT}`);
})
