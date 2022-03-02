const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const cors = require('cors');

const items = require('./routes/api/items');
const wallets = require('./routes/api/wallets');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB Config
const db=require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
.connect(db)
.then(()=> console.log('MongoDB connected'))
.catch(err=>console.log(err));

// USE routes
app.use(cors());
app.use('/api/items', items);
app.use('/api/wallets', wallets);
console.log('test');

//Serve static page in production mode
if(process.env.NODE_ENV === 'production'){
    console.log('in production');
    app.use(express.static('client/build'));
    app.get ('*', (req,res)=>{
        console.log(path.resolve(__dirname, 'client','build','index.html'));
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    });
}


//Run server

app.listen();