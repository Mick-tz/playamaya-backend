const express = require('express');

// inits
const app = express()

// settings
const PORT = process.env.PORT || 3000

// middleware

//routes

// static files

// server
app.listen(PORT, () => {
    console.log(`listening in port ${PORT}`)
})