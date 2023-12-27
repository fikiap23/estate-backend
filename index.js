import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
dotenv.config()

mongoose
  .connect(
    'mongodb+srv://lahitanianissa32:12345@cluster0.x7ul01d.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()
// Enable CORS for all routes with credentials support
app.use(
  cors({
    origin: ['https://zine-zone.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)
app.use(express.json())

app.use(cookieParser())

app.listen(3000, () => {
  console.log('Server is running on port 3000!')
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootPath = path.resolve(__dirname, '../')

app.use(express.static(path.join(rootPath, 'client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(rootPath, 'client/dist/index.html'))
})
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
