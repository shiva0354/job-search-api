import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routes/UserRoute.js'
import companyRouter from './routes/companyRoute.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

app.use('/', userRouter)
app.use('/company', companyRouter)

export default app
