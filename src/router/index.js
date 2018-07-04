import Vue from "vue";
import Router from "vue-router";
// import Home from "@/components/home/Home";
const Home = resolve => require(['@/components/home/Home.vue'], resolve);
const Search = resolve => require(['@/components/home/Search.vue'], resolve);
const Cart = resolve => require(['@/components/cart/cart.vue'], resolve);
const My = resolve => require(['@/components/my/my.vue'], resolve);
const Address = resolve => require(['@/components/my/address.vue'], resolve);
const sharedGoods = resolve => require(['@/components/homeGroupware/sharedGoods.vue'], resolve);
const salesVolume = resolve => require(['@/components/homeGroupware/salesVolume.vue'], resolve);
const wanshouProfit = resolve => require(['@/components/homeGroupware/wanshouProfit.vue'], resolve);
const Bonus = resolve => require(['@/components/myUse/bonus.vue'], resolve);
const Auction = resolve => require(['@/components/myUse/auction.vue'], resolve);
const Tug = resolve => require(['@/components/myUse/Tug.vue'], resolve);
const personalData = resolve => require(['@/components/myUse/personalData.vue'], resolve);
const myOrder = resolve => require(['@/components/myUse/myOrder.vue'], resolve);
const notLogin = resolve => require(['@/components/loginRegister/notlogin.vue'], resolve);
const register = resolve => require(['@/components/loginRegister/register.vue'], resolve);
const login = resolve => require(['@/components/loginRegister/login.vue'], resolve);
const bindingNumber = resolve => require(['@/components/loginRegister/bindingNumber.vue'], resolve);
const bindingAccount = resolve => require(['@/components/loginRegister/bindingAccount.vue'], resolve);
const forgetPass = resolve => require(['@/components/loginRegister/forgetPass.vue'], resolve);
const confirm = resolve => require(['@/components/cart/confirm.vue'], resolve);
const detail = resolve => require(['@/components/detail/detail.vue'], resolve);
const detailShop = resolve => require(['@/components/detail/detailShop.vue'], resolve);
const detailSearch = resolve => require(['@/components/detail/detailSearch.vue'], resolve);
const detailMore = resolve => require(['@/components/detail/detailMore.vue'], resolve);
const detailEvaluation = resolve => require(['@/components/detail/detailEvaluation.vue'], resolve);
const addAddress = resolve => require(['@/components/my/addAddress.vue'], resolve);
const addAddressDetail = resolve => require(['@/components/my/addAddressDetail.vue'], resolve);
const change = resolve => require(['@/components/my/change.vue'], resolve);


Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "首页",
      component: Home
    },
    {
      path: "/sharedGoods",
      name: "共享商品",
      component: sharedGoods
    },
    {
      path: "/salesVolume",
      name: "销量榜",
      component: salesVolume
    },
    {
      path: "/wanshouProfit",
      name: "盈利榜",
      component: wanshouProfit
    },
    {
      path: "/Search",
      name: "搜索",
      component: Search
    },
    {
      path: "/cart",
      name: "购物车",
      component: Cart
    },
    {
      path: "/my",
      name: "我的",
      component: My,
    },
    {
      path: "/address",
      name: "收货地址",
      component: Address
    },
    {
      path: "/my/bonus",
      name: "招兵红包",
      component: Bonus
    },
    {
      path: "/my/auction",
      name: "拍卖",
      component: Auction
    },
    {
      path: "/my/tug",
      name: "拓客系统",
      component: Tug
    },
    {
      path: "/my/personalData",
      name: "个人资料",
      component: personalData
    },
    {
      path: "/my/myOrder",
      name: "我的订单",
      component: myOrder
    },
    {
      path: "/notlogin",
      name: "未登录",
      component: notLogin
    },
    {
      path: "/register",
      name: "注册",
      component: register
    },
    {
      path: "/login",
      name: "登录",
      component: login
    },
    {
      path: "/bindingNumber",
      name: "绑定手机号",
      component: bindingNumber
    },
    {
      path: "/bindingAccount",
      name: "绑定已有账号",
      component: bindingAccount
    },
    {
      path: "/forgetPass",
      name: "忘记密码",
      component: forgetPass
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: detail
    },
    {
      path: "/detailShop/:storeId",
      name: "detailShop",
      component: detailShop
    },
    {
      path: "/detailSearch/:storeId",
      name: "detailSearch",
      component: detailSearch
    },
    {
      path: "/detailMore/:storeId/:goodsClassId",
      name: "detailMore",
      component: detailMore
    },
    {
      path: "/detail/:id/detailEvaluation/:goodsId",
      name: "detailEvaluation",
      component: detailEvaluation
    },
    {
      path: '/confirm',
      name: "confirm",
      component: confirm
    },
    {
      path:'/addAddress',
      name:"add",
      component:addAddress
    },
    {
      path:'/addAddressDetail',
      name:"addd",
      component:addAddressDetail
    },
    {
      path:'/change',
      name:"change",
      component:change
    },
  ]
});
