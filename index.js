import app from './src/app.js'
import connection from './src/database/mongo.js'
import http from 'http'

connection()


http.createServer(app).listen(3000, () => {
    console.log('Server is running on port 3000')
})
