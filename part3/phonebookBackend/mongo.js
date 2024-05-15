const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide a valid command line argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://chouikhiabdallah:${password}@cluster0.ct3dkk7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String  
});
const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    });

} else if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook:');
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });

} else if (process.argv.length > 5) {
    console.log('If the name has white spaces, please use double quotes');
    mongoose.connection.close();
}
