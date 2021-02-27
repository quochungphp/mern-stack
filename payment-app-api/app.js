const express = require('express');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const logger = require('morgan');
require('dotenv').config();
const appEnv = process.env;

const mongoose = require('mongoose');
const underscore = require('underscore');
const pathConfig = require('./path');

// Define path
global.__path_app = __dirname + '/';
global.__path_configs = __path_app + pathConfig.folder_configs + '/';
global.__path_helpers = __path_app + pathConfig.folder_helpers + '/';
global.__path_routers = __path_app + pathConfig.folder_routers + '/';
global.__path_schemas = __path_app + pathConfig.folder_schemas + '/';
global.__path_models = __path_app + pathConfig.folder_models + '/';
global.__path_validates = __path_app + pathConfig.folder_validates + '/';
global.__path_middleware = __path_app + pathConfig.folder_middleware + '/';
global.__path_services = __path_app + pathConfig.folder_services + '/';

const services = require(path.resolve(__path_services));
global.__underscore = underscore;
global.__utils = new services.utils.utils();

// Define router
const indexRouter = require('./routes/index');

// Apply mongo connect
const databaseConfig = require(__path_configs + 'collectionSchemas');

const stringConnect = `mongodb+srv://${databaseConfig.db_user}:${databaseConfig.db_password}@cluster0-z9sry.mongodb.net/${databaseConfig.db_database}?retryWrites=true&w=majority`;

mongoose
    .connect(stringConnect, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('DB Connection Error');
    });



// Apply express
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow/enable cross origin request
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
// Allow CORS from another domain
app.use(cors())
// Apply validate middleware
app.use(expressValidator())

// Define router
app.use('/', indexRouter);



// Error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json('error');
});

const start = () => (
    app.listen(appEnv.PORT, () => {
        console.log("Start nodejs server");
        console.log(`Port: ${appEnv.PORT}`);
    })
);

start();
