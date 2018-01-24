import Vue from 'vue';
import Router from 'vue-router';
import { About, Now, Portfolio, Main } from '../components';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/now',
      name: 'Now',
      component: Now,
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: Portfolio,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
  ],
});
