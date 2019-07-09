require('dotenv').config();

const cors = require('cors');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());

require('./routes')(app);

// app.use(function(req, res, next) {
// 	req.headers['if-none-match'] = 'no-match-for-this';
// 	next();
// });

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status);
});

app.listen(process.env.PORT, () => {
	console.log(`Server start on port ${process.env.PORT}`);
});

module.exports = app;
