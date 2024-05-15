
require('dotenv').config();


const express = require('express');
const app=express();
const cors = require('cors')
const Person = require('./models/person')


app.use(cors())
app.use(express.static('dist'))

const morgan = require('morgan');
morgan.token("post-body", (req, res) => JSON.stringify(req.body));

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post-body"));


app.get('/',(request,response)=>{
    response.send("<h1>Hello World !</h1>");
});
app.get('/api/persons',(request,response)=>{
  Person.find({}).then((persons)=>{
    response.json(persons);
  });


});
app.get('/info', (request, response) => {
  Person.countDocuments().then(numberOfPeople => {
    response.send(`
      <p>Phonebook has info for ${numberOfPeople} people</p>
      <br/>
      <p>${new Date().toDateString()} ${new Date().toLocaleTimeString()}</p>
    `);
  }).catch(error => {
    console.error(error);
    response.status(500).send({ error: 'Error fetching count of people' });
  });
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;  

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person.toJSON()); 
      } else {
        response.status(404).send({ error: 'not found' }); 
      }
    })
    .catch(error => {
      console.error(error);
      response.status(500).send({ error: 'server error' }); 
    });
});



app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
  
  

app.post('/api/persons',(request,response)=>{
  const body=request.body;
  if(!body.name || !body.number){
    return response.status(400).json({
      error:'name or number missing'
    });
  }
  const person = new Person({
    name:body.name,
    number:body.number
  });
  person.save().then((savedPerson)=>{
    response.json(savedPerson);
  });
}
);






const PORT = process.env.PORT 
app.listen(PORT,()=>{
  console.log(`server running in http://localhost:${PORT}`);
})

