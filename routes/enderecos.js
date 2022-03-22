const db = require('../config/db')

module.exports = app => {
    app.get('/enderecos', (req, res) => {
        db.query('SELECT * FROM Enderecos', (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ enderecos: data })
            }
        })
    })
    app.get('/enderecos/:id', (req, res) => {
        db.query('SELECT * FROM Enderecos WHERE id=?', [req.params.id], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ endereco: data[0] })
            }
        })
    })
    app.post('/enderecos', (req, res) => {
        let endereco = req.body
        db.query('INSERT INTO Enderecos (fornecedor_id, logradouro, complemento, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?)', [endereco.fornecedor_id, endereco.logradouro, endereco.complemento, endereco.cidade, endereco.estado, endereco.estado, endereco.cep], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ ...endereco, id: data.insertId })
            }
        })
    })
    app.put('/enderecos/:id', (req, res) => {
        let endereco = req.body
        db.query('UPDATE Enderecos SET fornecedor_id=?, logradouro=?, complemento=?, cidade=?, estado=?, cep=? WHERE id=?', [endereco.fornecedor_id, endereco.logradouro, endereco.complemento, endereco.cidade, endereco.estado, endereco.cep, req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ ...endereco })
            }
        })
    })
    app.delete('/enderecos/:id', (req, res) => {
        db.query('DELETE FROM Enderecos WHERE id=?', [req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ deleted_id: req.params.id })
            }
        })
    })
}