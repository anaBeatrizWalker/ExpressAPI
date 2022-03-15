const db = require('../config/db')

module.exports = app => {
    app.get('/produtos', (req, res)=>{

        db.query('SELECT * FROM Produtos', (err, data) => {
            if(err){
                return res.status(200).send({ err })
            }else {
                return res.status(200).send({ data })
            }
        })
    })
    app.post('/produtos', (req, res)=>{
        db.query('INSERT INTO Produtos (nome, preco, quantidade, validade, tipo_produto_id, fornecedor_id) values (?, ?, ?, ?, ?, ?)', (err, data) => {
            if(err){
                return res.status(200).send({ err })
            }else {
                return res.status(200).send({ data })
            }
        })
    })
}