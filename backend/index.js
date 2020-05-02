const express = require('express');
const morgan = require('morgan')
const app = express();

 app.use(express.json())
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
 response.json(persons);
})

app.get('/info', (request, response) => {
    const infoResponse  = `
    <p>PhoneBook has info of ${persons.length} people </p>
    <p>${new Date()} <\p>
    `
    response.send(infoResponse)
})

app.get('/api/persons/:id', (request, response) => {
 const id = Number(request.params.id);
 const person = persons.find(person => person.id === id);
 if(person) {
     response.json(person);
 } else {
     response.status(404).end();
 }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    response.status(204).end()

})

app.post('/api/persons', (request,response) => {
  const person = request.body;
//   console.log(person);
  const {name, number} = person;
//   console.log(name);

  if(!name) {
      return response.status(404).json({ 
        error: 'content missing or incorrect content' 
      });
  }

  const personAlreadyExists = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
//   console.log(personAlreadyExists)
  if(personAlreadyExists){
      return response.status(404).json({
          error: 'name must be unique'
      })
  }

  person.id = generateRandomId()
  persons = persons.concat(person);
 response.json(person);
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})