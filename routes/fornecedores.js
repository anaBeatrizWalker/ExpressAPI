const res = require('express/lib/response')
const db = require('../config/db')

module.exports = app => {
    app.get('/fornecedores', (req, res) => {
        db.query('SELECT * FROM Fornecedores', (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ data })
            }
        })
    })
    app.get(`/fornecedores/:id`, (req, res) => {
        db.query('SELECT * FROM Fornecedores WHERE id=?', [req.params.id], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ data })
            }
        })
    })
    app.post('/fornecedores', (req, res) => {
        db.query(`INSERT INTO Fornecedores (nome) VALUES (?)`, [req.body.nome], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send(req.body)
            }
        })
    })
    app.put('/fornecedores/:id', (req, res) => {
        db.query('UPDATE Fornecedores SET nome=? WHERE id=?', [`'${req.body.nome}'`, req.params.id], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send(Object.assign(req.params, req.body))
            }
        })
    })
    app.delete('/fornecedores/:id', (req, res) => {
        db.query('DELETE FROM Fornecedores WHERE id=?', [req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ id: req.params.id})
            }
        })
    })
}