const freeLogin = ['signup','issues','domains','docs','issues']

export default routeName => freeLogin.every(name => !routeName.includes(name))