require('dotenv').config();
const csrf = require('csurf');
const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const path = require('path');
const passport = require('passport');
const local = require('passport-local');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session')({
    secret: 'mysupersecret',
    resave: true,
    saveUninitialized: true
  });

// Import routes configuration
const router = require('./routes/index');
const categoryRouter = require('./routes/category');
const listingRouter = require('./routes/listing');
const sellerRouter = require('./routes/seller');

const app = express();

// Database setting
mongoose.connect('mongodb://localhost:27017/koolko-db', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected...'));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//Import config files
require('./config/passport')(passport);

// Express handlebars configuration
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main'
}));

// Static files 
app.use(express.static(path.join(__dirname, 'public')));

// Messages
app.use (flash());

// Cookies
app.use(cookieParser())

// Session
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session);


// Passport
app.use(passport.initialize());
app.use(passport.session());

// GraphQL
/* app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
  
  `),
  rootValue: {}
}));
 */
// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user_email = req.user;
  next();
});

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  res.locals.seller = req.seller;
  next();
});
app.use('/', router);
app.use('/c', categoryRouter);
app.use('/listing', listingRouter);
app.use('/panel', sellerRouter);

module.exports = app;