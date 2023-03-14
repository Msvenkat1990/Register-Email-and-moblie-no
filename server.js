const server = require('express');
const app =server();
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const router = require('./router/userRouter');
dotEnv.config();
const cors = require('cors');
const {PORT,DB} = process.env
mongoose.connect(DB)
.then(()=>{
    console.log('DB connected successfully')
})
.catch(()=>{
    console.log('DB not connected');
})

app.use(server.json());
app.use(cors());
app.use('/api',router);
app.use((err,req,res,next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || 'the server encountered an unexpected condition that prevented it from fulfilling the request';
    return res.status(errStatus).json({
        status:errStatus,message:errMessage
    })
})
app.listen(PORT,()=>{
    console.log('server run port at:',PORT);
})