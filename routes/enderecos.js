const db = require('../config/db')

module.exports = app => {
    app.get('/enderecos', (req, res) => {
        db.query(`SELECT * FROM Enderecos`, (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ data })
            }
        })
    })
    app.get('/enderecos/:id', (req, res) => {
        db.query(`SELECT * FROM Enderecos WHERE id=${req.params.id}`, (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ data })
            }
        })
    })
    app.post('/enderecos', (req, res) => {
        let field = req.body
        db.query(`INSERT INTO Enderecos (fornecedor_id, logradouro, complemento, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?)`, [field.fornecedor_id, field.logradouro, field.complemento, field.cidade, field.estado, field.estado, field.cep], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send(field)
            }
        })
    })
    app.put('/enderecos/:id', (req, res) => {
        let field = req.body
        db.query(`UPDATE Enderecos SET fornecedor_id=${field.fornecedor_id},
        logradouro='${field.logradouro}',
        complemento='${field.complemento}',
        cidade='${field.cidade}',
        estado='${field.estado}',
        cep='${field.cep}'
        WHERE id=${req.params.id}`, err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send(Object.assign(req.params, req.body))
            }
        })
    })
    app.delete('/enderecos/:id', (req, res) => {
        db.query(`DELETE FROM Enderecos WHERE id=${req.params.id}`, err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({id: req.params.id})
            }
        })
    })
}