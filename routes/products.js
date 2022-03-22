const db = require('../config/db')

module.exports = app => {
    app.get(`/produtos`, (req, res)=>{

        db.query('SELECT * FROM Produtos WHERE nome LIKE ?', [`%${req.query.termo}%`], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else {
                return res.status(200).send({ produtos: data })
            }
        })
    })
    app.get('/produtos/:id', (req, res)=>{
        db.query('SELECT * FROM Produtos WHERE id=?', [req.params.id], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else {
                return res.status(200).send({ produto: data[0] })
            }
        })
    })

    app.post('/produtos', (req, res)=>{
        let produto = req.body
        db.query('INSERT INTO Produtos (nome, preco, quantidade, validade, tipo_produto_id, fornecedor_id) VALUES (?, ?, ?, ?, ?, ?)', [produto.nome, produto.preco, produto.quantidade, produto.validade, produto.tipo_produto_id, produto.fornecedor_id], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else {
                return res.status(200).send({ ...produto, id: data.insertId })
            }
        })
    })
    app.put('/produtos/:id', (req, res)=>{
        let produto = req.body
        db.query('UPDATE Produtos SET nome=?, preco=?, quantidade=?, validade=?, tipo_produto_id=?, fornecedor_id=? WHERE id=?', [produto.nome, produto.preco, produto.quantidade, produto.validade, produto.tipo_produto_id, produto.fornecedor_id, req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else {
                return res.status(200).send({ ...produto })
            }
        })
    })
    app.delete('/produtos/:id', (req, res)=>{
        db.query('DELETE FROM Produtos WHERE id=?', [req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else {
                return res.status(200).send({ deleted_id: req.params.id })
            }
        })
    })
}