import Vue from 'vue';
import Router from 'vue-router';
import firstPage from './../pages/first.vue';
import secondPage from './../pages/second.vue';
import threePage from './../pages/three.vue';
Vue.use(Router);

const constantRoutes = [
    {
        path: '/first',
        component: firstPage,
        // hidden: true,
        children: [

        ]
    },
    {
        path: '/second',
        component: secondPage
        // hidden: true
    },
    {
        path: '/three',
        component: threePage
        // hidden: true
    },
    // ...
];

export default new Router({
    routes: constantRoutes
});
