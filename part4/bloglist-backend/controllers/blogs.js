const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs)
  // })
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogRouter.delete('/:id', async (req, res) => {
  const decodedToken = await jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    //token没有
    return res.status(401).json({ error: 'token is invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: 'user invalid' })
  }
  await blog.remove()
  user.blogs = user.blogs.filter((blog) => blog.id.toString() !== req.params.id)
  await user.save()

  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  // const body = req.body
  // const blog = new Blog({
  //   _id: req.params.id,
  //   url: body.url,
  //   title: body.title,
  //   author: body.author,
  //   likes: body.likes,
  // })
  const blog = req.body
  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = await jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    likes: body.likes ? body.likes : 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

module.exports = blogRouter