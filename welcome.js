const express = require('express')
const router = express.Router()


router.get('/', async (req, res, next) => {
    try {
        res.json({ message: 'welcome to the API' })
    }
    catch (err) {
        next(err)
    }
})

module.exports = router