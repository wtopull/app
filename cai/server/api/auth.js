import { Router } from 'express'
// import axios from 'axios'
// import {oauthParms,HOST,baseURL} from '../../build/api-config'
const router = Router()

router.get('/init', function (req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  // axios.post(`${HOST}/oauth/token`,oauthParms)
  // .then(({data:{access_token}}) => {
  //   res.json({access_token,ip})
  // })
  res.json({ip})
})


export default router
