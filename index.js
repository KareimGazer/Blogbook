const { PORT, MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
