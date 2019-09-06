const moment = require('moment')

module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date : moment().endOf('day').toDate()

        app.db('tasks')
            .where({ userId: req.user.id })
            .where('estimateAt', '<=', date)
            .orderBy('estimateAt')
            .then(tasks => res.json(tasks))
            .catch(err => res.status(500).json(err))
    }

    const save = (req, res) => {
        if (!req.body.desc.trim()) {
            return res.status(400).send('Descricao é um campo obrigatorio')
        }

        req.body.userId = req.user.id
        app.db('tasks')
            .insert(req.body)
    }
}