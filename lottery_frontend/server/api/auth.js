import { Router } from 'express'
// import axios from 'axios'
// import {oauthParms,HOST,baseURL} from '../../build/api-config'
const router = Router()

router.get('/init', function(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  // axios.post(`${HOST}/oauth/token`,oauthParms)
  // .then(({data:{access_token}}) => {
  //   res.json({access_token,ip})
  // })
  res.json({ ip })
})

router.get('/doc_enter', function(req, res, next) {
  // if (req.body.pw === 'a123newtopsky321') {
  if (req.query.pw === 'a123newtopsky321') {
    return res.json({success:'heihei123'})
  }
  res.json({error:1,message:'密码错误！请联系管理员'})
})

router.get('/doc_auth', function(req, res, next) {
  if (req.query.pw === 'heihei123') {
    return res.send(true)
  }
})

router.get('/ui_doc_enter', function(req, res, next) {
  if (req.query.pw === 'a123456') {
    return res.json({success:'haha123'})
  }
  res.json({error:1,message:'密码错误！请联系管理员'})
})

router.get('/ui_doc_auth', function(req, res, next) {
  if (req.query.pw === 'haha123') {
    return res.send(true)
  }
})

export default router
