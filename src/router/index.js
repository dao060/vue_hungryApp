import Vue from 'vue';
import Router from 'vue-router';
import seller from '@/components/seller/seller';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/',
      redirect: {name: 'goods'}
    }
  ]
});

