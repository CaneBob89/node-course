require("dotenv").config()
require("express-async-errors")

//express
const express=require("express")
const app=express()

//rest packages

const morgan=require("morgan")
const cookieParser=require("cookie-parser")

//database
const connectDB=require("./db/connect")

//routes
const authRoutes=require("./routes/authRoutes")

//middleware
const notFoundMiddleware=require("./middleware/not-found")
const errorHandlerMiddleware=require("./middleware/error-handler")

app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser())




app.get("/",async(req,res)=>{
  console.log(req.cookies.token)
  res.send("Ok")
})

app.use("/api/v1/auth",authRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const start=async()=>{
  const port=process.env.PORT||5000
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port,console.log(`Listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}
start()