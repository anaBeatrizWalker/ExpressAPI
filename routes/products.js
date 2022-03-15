const db = require('../config/db')

module.exports = app => {
    app.get('/produtos', (req, res)=>{

        db.query('SELECT * FROM Produtos', (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else {
                return res.status(200).send(data)
            }
        })
    })
    app.get('/produtos/:id', (req, res)=>{
        db.query(`SELECT * FROM Produtos WHERE id=${req.params.id}`, (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else {
                return res.status(200).send(data)
            }
        })
    })

    app.post('/produtos', (req, res)=>{
        let field = req.body
        db.query('INSERT INTO Produtos (nome, preco, quantidade, validade, tipo_produto_id, fornecedor_id) VALUES (?, ?, ?, ?, ?, ?)', [field.nome, field.preco, field.quantidade, field.validade, field.tipo_produto_id, field.fornecedor_id], err => {
            if(err){
                return res.status(400).send({ err })
            }else {
                return res.status(200).send({ field })
            }
        })
    })
    app.delete('/produtos/:id', (req, res)=>{
        db.query(`DELETE FROM Produtos WHERE id=${req.params.id}`, err => {
            if(err){
                return res.status(400).send({ err })
            }else {
                return res.status(200).send(
                    `Produto de id=${req.params.id} excluído.`
                )
            }
        })
    })
    app.put('/produtos/:id', (req, res)=>{
        let data = req.body
        db.query(`UPDATE Produtos SET 
            nome='${data.nome}', 
            preco=${data.preco}, 
            quantidade=${data.quantidade}, 
            validade='${data.validade}',
            tipo_produto_id=${data.tipo_produto_id},
            fornecedor_id=${data.fornecedor_id}
            WHERE id=${req.params.id}`, err => {
            if(err){
                return res.status(400).send({ err })
            }else {
                return res.status(200).send({ data })
            }
        })
    })
}