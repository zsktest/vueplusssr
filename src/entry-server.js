import {initVue} from "./app";

export default context => {
  const { app } = initVue();
  return new Promise((resolve, reject) => {
    const { app, store, router, App } = initVue();
    let components = App.components;
    // let asyncDataPromiseFns = [];
    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {

        context.state = store.state;
        resolve(app);

      })

      
    }, reject)



    // Object.values(components).forEach(component => {
    //   if (component.asyncData) {
    //     component.asyncData({ store });
    //     // asyncDataPromiseFns.push();
    //   }
    // });

    // Promise.all(asyncDataPromiseFns).then((result) => {
    //   context.state = store.state;
    // }, reject).catch((err)=>{
    //     console.log("error~~~~~~~~~~~~~");
    //     console.log(err);
    // });
    //resolve(app);
  });
}
  
