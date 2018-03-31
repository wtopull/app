const freeLogin = ['signup','issues','domains','docs','issues','test']

export default routeName => routeName && freeLogin.every(name => !routeName.includes(name))