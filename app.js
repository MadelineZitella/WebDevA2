const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')

app.use('/api/posts', postsRoute)
app.use('/api/user', authRoute)

async function connectDB() {
    await mongoose.connect(process.env.DB_CONNECTOR, {
    });
    console.log('DB is connected.');
}

// Call the function
connectDB();

// Start Server
app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});