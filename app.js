const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const middleware = require('./utils/ middleware');

logger.info('connection to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
		useCreateIndex: true,
	})
	.then(() => {
		logger.info('connected to mongodb');
	})
	.catch(error => {
		logger.error(
			'error connecting to mongodb',
			error.message
		);
	});

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

app.use(middleware.unknowEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
