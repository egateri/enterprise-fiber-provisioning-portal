require('dotenv').config();
const db =require('./config/database');
const cors =require('cors')
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const express = require('express');
const PORT = process.env.PORT||5500;
const app = express();
app.set(db);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(indexRouter);
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})