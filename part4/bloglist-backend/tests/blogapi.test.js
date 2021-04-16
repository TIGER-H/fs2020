const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./testhelper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { beforeEach, test, expect, afterAll } = require('@jest/globals')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('4.8 HTTP GET method test', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

// test('4.9 id not _id', async () =>{
//     await api.get('/api/blogs')
//     .expect()
// })

test('4.10 HTTP POST', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
    url: 'url',
  }
  await api
    .post('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogAtEnd = await helper.blogsInDb()
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogAtEnd.map((n) => n.title)
  expect(titles).toContain('Canonical string reduction')
})

test('4.14 succeeds with valid data', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: true,
    url: 'urlrul',
    likes: 5,
  }

  await api
    .post('/api/Blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((n) => n.title)
  expect(titles).toContain('async/await simplifies making async calls')
})

describe('4.13 deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('blogs', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('4.15', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tg',
      name: 'htg',
      password: 'blogs',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
