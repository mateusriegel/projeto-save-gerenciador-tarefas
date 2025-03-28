import express from 'express' 

const router = express.Router()

router.post('/cadastro', (req, res) => {
    const user = req.body

    res.status(200).json(user)
})

export default router