const cors = require('cors')
const express = require('express')
let consign = require('consign')
let bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
    allowedHeaders:'*',
    origin:'*',
    methods: 'GET, POST, PUT, DELETE'
}))

consign().include('routes').into(app)

app.listen(4000, '127.0.0.1', ()=>{
    console.log('Servidor rodando na porta 4000...')
})