// 组装模块并导出 store 的地方
import Vue from 'vue';
import Vuex from 'vuex';

import Cart from './modules/Cart';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {  //和文件名字对应
    Cart,
  },
  strict: process.env.NODE_ENV !== 'production', // 严格模式
});