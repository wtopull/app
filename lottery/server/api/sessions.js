import { Router } from 'express'

const router = Router()

router.get('/login', (req, res) => {
  if (req.query.token) {
    req.session.token = req.query.token
    return res.send(true)
  }
  res.status(401).json({ message: 'Bad credentials' })
})

export default router