const mongoose = require('mongoose')
const uniquevalidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URL

console.log('connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
    console.log('connected to MONGODB');
})
.catch(error => {
    console.log('something wrong happened', error.message);
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        minlength:3
    },
    number:{
        type:String,
        required:true,
        minlength:8
    }
})

personSchema.plugin(uniquevalidator)

//
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)