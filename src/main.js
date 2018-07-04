import Vue from "vue";
import Vuex from 'vuex'
import App from "./App";
import router from "./router";
import axios from "axios";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import $ from "jquery";
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import apiConfig from '../config/api.config'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = apiConfig.baseUrl
Vue.use(VueAwesomeSwiper);
Vue.use(MintUI);
Vue.config.productionTip = false;
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true;
new Vue({
	el: "#app",
	router,
	components: {
		App
	},
	template: "<App/>"
});
//全局注册。用于价格后面的.0
Vue.filter('formatMoney', function(value) {
	if (value) {
		return value.toFixed(1);
	}

})
//图片所有路径的判断
Vue.prototype.changeData = function(path, name) {
	// debugger;
	if (!path) {
		return false;
	}
	if (path.indexOf("data/files/store") != -1) {
		path = "/gold/" + path + "/" + name;
		return path;
	} else {
		name = "/" + path + "/" + name;
		return name;
	}
}
//未登录跳转
router.beforeEach((to, from, next) => {
	if (to.path != '/' && to.path != '/login' && to.path != '/register') {
		if (!localStorage.userid && to.path != '/notlogin') {
			console.log(router);
			router.push('/notlogin');
		}
	}
	next()
})