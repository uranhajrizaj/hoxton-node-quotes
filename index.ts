import express from'express'
import cors from 'cors'
const app=express()
const port=4000

const quotes=[
    {
      id:1,
      title:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
      author:"Albert Einstein"
},
{
    id:2,
    title:"Imagination is more important than knowledge.",
    author:"Albert Einstein"
},
{
    id:3,
    title:"The greatest scientists are artists as well.",
    author:"Albert Einstein"
},
{
    id:4,
    title:"Life is like riding a bicycle. To keep your balance you must keep moving.",
    author:"Albert Einstein"
},
{
    id:5,
    title:"A man who dares to waste one hour of time has not discovered the value of life.",
    author:"..."
},
{
    id:6,
    title:"All our dreams can come true, if we have the courage to pursue them",
    author:"Walt Disney"
},
{
    id:7,
    title:"If you can dream it, you can do it",
    author:"Walt Disney"
},
{
    id:8,
    title:"Work hard in silence, let your success be your noise",
    author:"Frank Ocean"
},
{
    id:9,
    title:"The art and science of asking questions is the source of all knowledge",
    author:"Thomas Berger"
},
{
    id:10,
    title:"The science of today is the technology of tomorrow",
    author:"Edward Teller"
}

]


app.use(cors())

app.get("/quotes",(req,res)=>{
    res.send(quotes)
})

app.get("/random",(req,res)=>{
    res.send(quotes[Math.floor(quotes.length*Math.random())])
})

app.get("*",(req,res)=>{
    res.send(404)
})

app.listen(port,()=>{
    console.log(`Server is runing in : http://localhost:${port}/quotes`)
})