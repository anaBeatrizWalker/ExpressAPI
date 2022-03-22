const db = require('../config/db')

module.exports = app => {
    app.get('/tipos_produtos', (req, res) => {
        db.query('SELECT * FROM TiposProduto', (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ tipos_produto: data })
            }
        })
    })
    app.get('/tipos_produtos/:id', (req, res) => {
        db.query('SELECT * FROM TiposProduto WHERE id=?', [req.params.id], (err, data )=> {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ tipo_produto: data[0] })
            }
        })
    })
    app.post('/tipos_produtos', (req, res) => {
        let tipo_produto = req.body
        db.query('INSERT INTO TiposProduto (nome) VALUES (?)', [tipo_produto.nome], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ ...tipo_produto, id: data.insertId})
            }
        })
    })
    app.put('/tipos_produtos/:id', (req, res) => {
        let tipo_produto = req.body
        db.query('UPDATE TiposProduto SET nome=? WHERE id=?', [tipo_produto.nome, req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ ...tipo_produto })
            }
        })
    })
    app.delete('/tipos_produtos/:id', (req, res) => {
        db.query('DELETE FROM TiposProduto WHERE id=?', [req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ deleted_id: req.params.id  })
            }
        })
    })
}