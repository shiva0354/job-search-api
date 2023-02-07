import app from './src/app.js'
import connection from './src/database/mongo.js'

connection()

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
