const express = require('express')
const residentRoutes = require('./routes/resident');
const bodyParser = require('body-parser');
const cors=require('cors');
const mongoose = require('mongoose');
const mlaRoutes = require('./routes/mla');
const mong = require('./PassKeys');

mongoose.connect(`mongodb+srv://${mong.id}:${mong.pwd}@examplecluster-7emgk.mongodb.net/test?retryWrites=true&w=majority`, function(err) {
    if (err) {
        console.log("Database Not Connected", err);
    } else {
        console.log("Atlas Connected")
    }
});

const port = 2000;
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/resident',residentRoutes);
app.use('/mla',mlaRoutes);


app.get('/',(req,res)=>{
    res.send('Hello')
})



app.listen(port, ()=>{
    console.log('Server is up on port: ',port)
});