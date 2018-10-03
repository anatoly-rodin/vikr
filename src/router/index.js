import Vue from 'vue';
import Router from 'vue-router';
import routes  from './routes';
import store from '../store';

Vue.use(Router);

let router = new Router({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.access) {
            next({ name: 'SignIn' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;

