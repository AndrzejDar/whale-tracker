const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const cors = require('cors');

const items = require('./routes/api/items');

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

//Serve static page in production mode
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get ('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    });
}


//Run server
console.log(process.env.PORT);
const port = process.env.PORT || 3000; //variable from host or 5000
app.listen(port,()=> console.log(`server started on port: ${port}`));