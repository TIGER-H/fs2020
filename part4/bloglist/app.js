const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const mongoose = require('mongoose')

const Blog = require('./models/blog')

const mongoUrl = config.MONGODB_URI
console.log('connecting to', mongoUrl);
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
  console.log('connected to MONGODB')
})
.catch(error => {
  console.log('error connecting to MONGODB', error.message);
})

app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

module.exports = app