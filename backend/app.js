require('dotenv').config();
const db =require('./config/database');
const cors =require('cors')
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const updateRouter = require('./routes/update');
const deleteRouter = require('./routes/delete');
const peRouter = require('./routes/peRoutes')
const neRouter = require('./routes/neRoutes');
const express = require('express');
const PORT = process.env.PORT||5500;
const app = express();


app.set(db);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(indexRouter);
app.use("/v1/users",registerRouter);
app.use("/v1/users",loginRouter);
app.use("/v1/users",updateRouter);
app.use("/v1/users",deleteRouter);
app.use("/v1/pes",peRouter);
app.use("/v1/nes",neRouter);
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})