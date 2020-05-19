import Vue from 'vue';
import Router from 'vue-router';
import firstPage from './../pages/first.vue';
import secondPage from './../pages/second.vue';
import threePage from './../pages/three.vue';
import BarPage from './../pages/bar.vue';
import BarsPage from './../pages/bars.vue';
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
    {
        path: '/bar',
        component: BarPage
        // hidden: true
    },
    {
        path: '/bars',
        component: BarsPage
        // hidden: true
    },
    // ...
];

export default new Router({
    routes: constantRoutes
});
