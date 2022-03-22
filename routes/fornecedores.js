const res = require('express/lib/response')
const db = require('../config/db')

module.exports = app => {
    app.get('/fornecedores', (req, res) => {
        db.query('SELECT * FROM Fornecedores', (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ fornecedores: data })
            }
        })
    })
    app.get(`/fornecedores/:id`, (req, res) => {
        db.query('SELECT * FROM Fornecedores WHERE id=?', [req.params.id], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ fornecedor: data[0] })
            }
        })
    })
    app.post('/fornecedores', (req, res) => {
        let fornecedor = req.body
        db.query(`INSERT INTO Fornecedores (nome) VALUES (?)`, [fornecedor.nome], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ ...fornecedor, id: data.insertId })
            }
        })
    })
    app.put('/fornecedores/:id', (req, res) => {
        let fornecedor = req.body
        db.query('UPDATE Fornecedores SET nome=? WHERE id=?', [fornecedor.nome, req.params.id], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ ...fornecedor })
            }
        })
    })
    app.delete('/fornecedores/:id', (req, res) => {
        db.query('DELETE FROM Fornecedores WHERE id=?', [req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ deleted_id: req.params.id})
            }
        })
    })
}