module.exports = app => {
    app.get('/produtos', (req, res)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({
            produtos: [{
                id: 1,
                nome: 'Detergente'
            }]
        })
    })
    app.post('/produtos', (req, res)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(req.body)
    })
}