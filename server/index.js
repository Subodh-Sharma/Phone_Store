import 'dotenv/config';
import Express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from "cors";
import path from "path";
const app = Express();
import userRouter from "./router/user.js"
import dealerRouter from "./router/dealer.js"
import phoneRouter from "./router/phone.js"

app.use(Express.json({limit:"30mb",extended:true}));
app.use(Express.urlencoded({limit:"30mb",extended: true}));
app.use(morgan("dev"));
app.use(cors());

app.use("/dealer",dealerRouter);
app.use("/user",userRouter);
app.use("/phone",phoneRouter);
//-------------------Deployment code---------------------//

const __dirname = path.resolve();

if(process.env.NODE_ENV==="production"){
    app.use(Express.static(path.join(__dirname,"/client/build")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}else{
    app.get("/",(req,res)=>{
        res.send("server is running");
    })
}

//-------------------Deployment code---------------------//

const url = process.env.DBURL;

mongoose.connect(url).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Listening at port ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log(err)
})