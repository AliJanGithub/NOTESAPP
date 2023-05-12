const  connecttodb=require('./db')
const express = require('express')
var cors = require('cors')
const app = express()


connecttodb;
app.use(cors(
  {
    origin: 'http://localhost:3000'
  }
))

const port = 4001

app.use(express.json())

app.get('/', (req, res) => { 
  res.send('Hello, world!');
});    

app.use('/api/auth',require('./route/auth.js') )

app.use('/api/notes',require("./route/notes.js"))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})