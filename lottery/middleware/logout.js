import isLoginRoute from '~/util/free-login'

export default function ({store:{state:{user,isLogout}},redirect,route:{name}}) {
  //no route
  if(!name) return
  name === 'login' ? user.token && redirect('/home') : isLoginRoute(name) && !user.token && isLogout && redirect('/login')
    
}