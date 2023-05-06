// const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/TTIoTSignup")
//     .then(()=>{
//     console.log('Connection successful');
//     })
//     .catch((e)=>{
//     console.log('No connection');
//     })




    const mongoose = require('mongoose')

    const url = `mongodb+srv://ttiotnhuyvan:UHRrQ3H4HeltPY8T@ttiotnhuyvan.6zmsruw.mongodb.net/?retryWrites=true&w=majority`;
    
    const connectionParams={
       
    }
    mongoose.connect(url,connectionParams)
        .then( () => {
            console.log('Connected to database ')
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })    
