import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).send('Hello !!!')
})

router.get('/', (req, res) => {
    return res.status(200).send('Hello !!!')
})

export default router
