const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())

const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const dburl = require('./Config/dbConfig')
mongoose.connect(dburl)

const port = process.env.PORT || 7000
const userRouter = require('./routes/userRouter')

app.use('/users',userRouter)

app.listen(port,()=>console.log(`App is listening in port ${port}`))