const cors = require('cors')
const express = require('express')
let consign = require('consign')
let bodyParser = require('body-parser')
let app = express()

app.use(cors({
    allowedHeaders:'*',
    origin:'*',
    methods: 'GET, POST, PUT, DELETE'
}))

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))

consign().include('routes').into(app)

app.listen(4000, '127.0.0.1', ()=>{
    console.log('Servidor rodando na porta 4000...')
})