import express from 'express'
import { configDotenv } from 'dotenv'
import connectDB from './config/connectDB.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import userRoutes from './routes/userRoutes.js'
import classRoutes from './routes/classRoute.js'
import scheduleRoute from './routes/scheduleRoutes.js'
import attendanceRoute from './routes/attendanceRoutes.js'
import cors from 'cors'

configDotenv()
connectDB()

const app = express()
app.use(cookieParser())
const port = process.env.PORT || 5001

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('uploads'))

app.use('/api/users', userRoutes)
app.use('/api/class', classRoutes)
app.use('/api/schedules', scheduleRoute)
app.use('/api/attendance', attendanceRoute)


app.listen(port, () => {
  console.log(`Running on server http://localhost:${port}`)
})
