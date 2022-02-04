const express = require ('express');
const mongoose = require ('mongoose');
const config = require ('config')

const cors = require('cors');



const app = express();

//Bodyparser Middleware
app.use(express.json());

//DB Config
const db=config.get('mongoURI');

// Connect to Mongo
mongoose
.connect(db, {
    //useNewUrlParser: true,
    //useCreateIndex: true

}) //adding mongo url parser
.then(()=> console.log('MongoDB connected'))
.catch(err=>console.log(err));

// USE routes
app.use(cors());
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

//Serve static page in production mode
 if(process.env.NODE_ENV === 'production'){ // on cyber no acces to this variable
    app.use(express.static('client/build'));
    app.get ('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    });
 }


//Run server
console.log(process.env.PORT);
const port = process.env.PORT || 5000; //variable from host or 5000
app.listen(port,()=> console.log(`server started on port: ${port}`));