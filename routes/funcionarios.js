const db = require('../config/db')

module.exports = app => {
    app.get('/funcionarios', (req, res) => {
        db.query('SELECT * FROM Funcionarios', (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ data })
            }
        })
    })
    app.get('/funcionarios/:id', (req, res) => {
        db.query('SELECT * FROM Funcionarios WHERE id=?', [req.params.id], (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ data })
            }
        })
    })
    app.post('/funcionarios', (req, res) => {
        let field = req.body
        db.query('INSERT INTO Funcionarios (nome, cargo, telefone, email) VALUES (?, ?, ?, ?)', [field.nome, field.cargo, field.telefone, field.email], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send(req.body)
            }
        })
    })
    app.put('/funcionarios/:id', (req, res) => {
        let field = req.body
        db.query('UPDATE Funcionarios SET nome=?, cargo=?, telefone=?, email=? WHERE id=?', [`'${field.nome}'`, `'${field.cargo}'`, `'${field.telefone}'`, `'${field.email}'`, req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send(Object.assign(req.params, field))
            }
        })
    })
    app.delete('/funcionarios/:id', (req, res) => {
        db.query(`DELETE FROM Funcionarios WHERE id=?`, [req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({id: req.params.id})
            }
        })
    })
}