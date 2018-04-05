
const freeLogin = ['signup','issues','domains','docs']

export default routeName => freeLogin.every(name => !routeName.includes(name))