const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const router = require('./routes/api/members');
const logger = require('./middleware/logger');
const members = require('./Members');

const PORT = process.env.PORT || 5000;


// The App core
const app = express();

// Init middleware
app.use(logger);

// Handlbars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Init body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) => res.render('index', {
  title: 'Members App',
  members
}));

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes Members API
app.use('/api/members', router);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

//Run app, then load http://localhost:5000 in a browser to see the output.
