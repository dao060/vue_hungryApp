// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import apiResource from 'vue-resource';

import './common/stylus/index.styl'

// 配置阻止vue在启动时生成生产提示
Vue.config.productionTip = false;

Vue.use(apiResource);

let app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});