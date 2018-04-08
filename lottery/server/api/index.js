import express,{ Router } from 'express'

import auth from './auth'
// import sessions from './sessions'

const router = Router()
const app = express()
// router.use((req, res, next) => {
//   Object.setPrototypeOf(req, app.request)
//   Object.setPrototypeOf(res, app.response)
//   req.res = res
//   res.req = req
//   next()
// })

router.use(auth)
// router.use(sessions)

export default router
