const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'http://www.d1sc.com/api/' : 'api/'//正式服接口
    // baseUrl: isPro ? 'http://182.61.29.222:8080/api/' : 'api/'     //测试服接口
}