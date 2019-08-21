const express = require('express');
const path = require('path');
const router = require('./routes/api/members');
const logger = require('./middleware/logger');

const PORT = process.env.PORT || 5000;

const app = express();

// Init middleware
app.use(logger);

// Init body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Members API
app.use('/api/members', router);

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

//Run app, then load http://localhost:5000 in a browser to see the output.
