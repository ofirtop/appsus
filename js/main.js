
import myRoutes from './routes.js';

const myRouter = new VueRouter({routes: myRoutes})
Vue.use(myRouter)


window.vueApp = new Vue({
    el: '#app',
    router: myRouter,
    components: {
        
        
    }
})

