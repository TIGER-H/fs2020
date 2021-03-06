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
    // id: 1,
  })
  response.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', {
    username: 1,
    name: 1,
  })
  if (!blog) return res.status(404).send('not found')
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
    ...body,
    likes: body.likes ? body.likes : 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.comment
  const updated = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })
  updated.comments = [...updated.comments, comment]
  updated.save()
  response.status(200).json(updated)
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
  const blog = req.body
  // console.log(blog);
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  })
  // const updatedBlog = await Blog.findById(req.params.id).populate('user', {username:1, name:1}) // check
  console.log(updatedBlog)
  res.json(updatedBlog)
})

module.exports = blogRouter
