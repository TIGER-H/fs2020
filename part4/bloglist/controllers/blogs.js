const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", async (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs)
  // })
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put("/:id", async (req, res) => {
  const body = req.body
  const blog = new Note(body)
  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(blog)
})

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body)

  // blog.save().then((result) => {
  //   response.status(201).json(result)
  // })
  const savedBlog = await blog.save()
  response.json(savedBlog)
})

module.exports = blogRouter
