const blogRoute = require('express').Router();
const Blog = require('../models/blog');

blogRoute.get('/', (request, response, next) => {
	Blog.find({})
		.then(blogs => {
			response.json(blogs);
		})
		.catch(error => next(error));
});

blogRoute.post('/', (request, response, next) => {
	const newBlog = new Blog(request.body);
	newBlog
		.save()
		.then(savedBlog => {
			response.json(savedBlog);
		})
		.catch(error => next(error));
});

module.exports = blogRoute;
