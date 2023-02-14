require ('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const notFound = require('./middleware/notFound')
const authRouter = require('./routes/authRouter')
const journalRouter = require('./routes/journalRouter')
const auth = require('./middleware/authentication')
const cors = require('cors')

//security packages



//middleware
app.use(cors())
app.use(express.json());

//routes
app.use('/api/v1', authRouter);
app.use('/api/v1/journal', auth, journalRouter);

//error routes
app.use(notFound)

const start = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`server running on port ${PORT}...`);
        })
    }catch(error){
        console.log(error);
    }
}
start()
