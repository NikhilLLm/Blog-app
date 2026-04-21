import express from 'express';
import authRouter from './modules/auth/auth.routes';
import postsRouter from './modules/posts/posts.routes';
import librariesRouter from './modules/libraries/libraries.routes';
import cors from 'cors';

const app=express()

app.use(express.json());

//cors property

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.get('/health',(req,res)=>{
    res.json({status:'ok'})
})
console.log("Reached server")
app.use("/auth",authRouter)
app.use("/posts",postsRouter)
app.use("/libraries",librariesRouter)

export default app
