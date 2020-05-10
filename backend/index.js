require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const app = express();
const Person = require('./models/person')

 app.use(express.json())
 app.use(express.static('build'))

 //app.use(morgan('tiny'))


app.use(morgan(function (tokens, req, res) {
    let log = 
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms ',      
    ].join(' ')
    
    if(tokens.method(req,res) === 'POST') {
        log += JSON.stringify(req.body)
    }
    return log;
  }))

let persons = [ { name: 'Arto Hellas', number: '040-123456', id:1 },
{ name: 'Ada Lovelace', number: '39-44-5323523', id:2 },
{ name: 'Dan Abramov', number: '12-43-234345', id:3  },
{ name: 'Mary Poppendieck', number: '39-23-6423122' , id:4}];

const generateRandomId = () => Math.floor(Math.random() * 1000000);


app.get('/api/persons', (request,response) => {
Person.find({}).then(persons => {
 response.json(persons);
})
})

app.get('/info', (request, response) => {
    const infoResponse  = `
    <p>PhoneBook has info of ${Person.length} people </p>
    <p>${new Date()} <\p>
    `
    response.send(infoResponse)
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id, function(err, person) {
    if(err) {
     return response.status(404).end();
    }
    response.json(person.toJSON())
  })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id, function(err){
      if(err) {
        return response.status(404).end()
      }
      response.status(204).end();
    })
    
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number 
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
    mongoose.connection.close()
  })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})