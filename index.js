import app from './src/app.js'
import dbConnection from './src/database/mongo.js'

dbConnection()

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
