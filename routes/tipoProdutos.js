const db = require('../config/db')

module.exports = app => {
    app.get('/tipos_produtos', (req, res) => {
        db.query('SELECT * FROM TiposProduto', (err, data) => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ data })
            }
        })
    })
    app.get('/tipos_produtos/:id', (req, res) => {
        db.query('SELECT * FROM TiposProduto WHERE id=?', [req.params.id], (err, data )=> {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({ data })
            }
        })
    })
    app.post('/tipos_produtos', (req, res) => {
        db.query('INSERT INTO TiposProduto (nome) VALUES (?)', [req.body.nome], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send(req.body)
            }
        })
    })
    app.put('/tipos_produtos/:id', (req, res) => {
        db.query('UPDATE TiposProduto SET nome=? WHERE id=?', [`'${req.body.nome}'`, req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send(Object.assign(req.params, req.body))
            }
        })
    })
    app.delete('/tipos_produtos/:id', (req, res) => {
        db.query('DELETE FROM TiposProduto WHERE id=?', [req.params.id], err => {
            if(err){
                return res.status(400).send({ err })
            }else{
                return res.status(200).send({id: req.params.id})
            }
        })
    })
}