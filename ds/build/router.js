module.exports = {
  middleware: ['logout'],
  linkExactActiveClass: 'active',
  extendRoutes (routes, resolve) {
    // !isDev && _.remove(routes,_ => _.name === 'login-test')
    // function makeDefault(router) {
    //   const firstRouter = router.children[0]
    //   const children = firstRouter.children
    //   const component = children ? children[0].component : firstRouter.component
    //   router.children.unshift({ path: '', component })
    //   delete router.name
    //   if (children) makeDefault(firstRouter)
    // }
    // makeDefault(routes.find(_ => _.name === 'admin'))

    // routes.find(_ => _.name === 'admin').children.forEach(router => {
    //   if(router.children) {
    //     const component = router.children[0].component
    //     router.children.unshift({ path: '', component })
    //     delete router.name
    //   }
    // })

    return routes

  }
}