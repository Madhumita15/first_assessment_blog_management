const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require('dotenv').config()
const express = require('express')
const dbCon = require('./src/config/dbCon')
const app = express()
const cors = require('cors')

dbCon()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const router = require('./src/routes/index')
app.use(router)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`app is listening on PORT ${PORT}`)
})