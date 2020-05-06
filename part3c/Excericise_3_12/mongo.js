const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]
  
  const url =
    `mongodb+srv://fullstack:${password}@cluster0-5exd6.mongodb.net/phone-app?retryWrites=true&w=majority`
  
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phoneBookSchema = new mongoose.Schema({
    name : String,
    number: String
});

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema );

//Display entries
if(process.argv.length === 3) {
    PhoneBook.find({}).then( result => {
        console.log("PhoneBook:")
        result.forEach(PhoneBook => {
            console.log(`${PhoneBook.name} ${PhoneBook.number}`)
        })
        mongoose.connection.close();
    })
} else { //Add entries

    const phoneDetails = new PhoneBook({
        name: process.argv[3],
        number: process.argv[4]
    })

    console.log(phoneDetails);
    phoneDetails.save().then(result => {
        console.log("Added Phone Details");
        mongoose.connection.close();
    })

}

