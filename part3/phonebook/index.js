if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const errorHandler = (error, req, res, next) => {
  // console.log(error.message);

  if(error.name === 'castError' && error.kind === 'objectId'){
    return res.status(400).send({ error : 'malformatted id' })
  } else if(error.name === 'ValidationError'){ //此时输出有双引号 why？
    return res.status(400).send(`${error.message}`)
  }

  next(error)
}

morgan.token('POST-body',function (req, res){
  return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['POST-body'](req,res),
  ].join(' ')
}))

// let persons = [
//     {
//         id:1,
//         name:"Arto Hellas",
//         number:"040-123456"
//     },
//     {
//         id:2,
//         name:"Ada Lovelace",
//         number:"39-44-5323523"
//     }
// ]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {//tbd
  Person.countDocuments({}, (err, sum) => {
    response.send(`Phonebook has info for ${sum} people` + '</br>' +  Date())
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person !== undefined)
      response.json(person)
    else
      response.status(404).end()
  })
    .catch(error => {
      next(error)
    })


  // const id = Number(request.params.id)
  // const person = persons.find(person => person.id === id)
  // if(person){
  //     response.json(person)
  // }else{
  //     response.status(404).end()
  // }
})

app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(person => person.id !== id)
  // response.status(204).end()
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  // const person = {
  //     ...body, number:body.number
  // }
  opt = {
    runValidators:true,
    new:true
  }

  Person.findByIdAndUpdate(request.params.id, { number:body.number }, opt)
    .then(updatedPerson => {
      // console.log(updatedPerson);
      response.json(updatedPerson)
    })
    .catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  // console.log(request.body); // object type
  // console.log(JSON.stringify(body));
  // console.log(body);

  // if(body.name === undefined) {
  //     return response.status(400).json({
  //         error: "missing name"
  //     })
  // }

  // if(body.number === undefined){
  //     return response.status(400).json({
  //         error: "missing number"
  //     })
  // }

  // if(persons.map(person => person.name).includes(body.name)){
  //     return response.status(400).json({
  //         error: `${body.name} already exists!`
  //     })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
    // id: Math.floor(Math.random()*10000),
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(err => next(err))

  // persons = persons.concat(person)
  // response.json(persons)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server now running on port ${PORT}`)
})

app.use(errorHandler)