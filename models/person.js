const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const DB_PASSWORD = process.env.DB_PASSWORD
const url =
  `mongodb+srv://stefangrzelec:${DB_PASSWORD}@full-stack-open-stefan.lt0swu0.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=full-stack-open-stefan`



mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
    minlength: 3
  },
  number: {
    type: String,
    required: false,
    validate: {
      validator: function(value) {
        return /^\d{6}$/.test(value);
      },
      message: 'Number must be a 6-digit string'
    }
  }
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)