import Vue from 'vue';
import VueRouter from 'vue-router';
import router from '@/router';
import store from './store';
import app from '@/App';
import './assets/css/styles.scss';

Vue.use(VueRouter);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(app)
});