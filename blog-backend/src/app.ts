import express from 'express';
import authRouter from './modules/auth/auth.routes';
import postsRouter from './modules/posts/posts.routes';
import librariesRouter from './modules/libraries/libraries.routes';

const app=express()

app.use(express.json());

app.get('/health',(req,res)=>{
    res.json({status:'ok'})
})

app.use("/auth",authRouter)
app.use("/posts",postsRouter)
app.use("/libraries",librariesRouter)

export default app
