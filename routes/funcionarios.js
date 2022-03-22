const db = require('../config/db')

module.exports = app => {
    app.get('/funcionarios', (req, res) => {
        db.query('SELECT * FROM Funcionarios', (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ funcionarios: data })
            }
        })
    })
    app.get('/funcionarios/:id', (req, res) => {
        db.query('SELECT * FROM Funcionarios WHERE id=?', [req.params.id], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ funcionario: data[0] })
            }
        })
    })
    app.post('/funcionarios', (req, res) => {
        let funcionario = req.body
        db.query('INSERT INTO Funcionarios (nome, cargo, telefone, email) VALUES (?, ?, ?, ?)', [funcionario.nome, funcionario.cargo, funcionario.telefone, funcionario.email], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ ...funcionario, id: data.insertId })
            }
        })
    })
    app.put('/funcionarios/:id', (req, res) => {
        let funcionario = req.body
        db.query('UPDATE Funcionarios SET nome=?, cargo=?, telefone=?, email=? WHERE id=?', [funcionario.nome, funcionario.cargo, funcionario.telefone, funcionario.email, req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ ...funcionario })
            }
        })
    })
    app.delete('/funcionarios/:id', (req, res) => {
        db.query(`DELETE FROM Funcionarios WHERE id=?`, [req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ deleted_id: req.params.id })
            }
        })
    })
}