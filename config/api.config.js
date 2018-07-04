const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'http://www.d1sc.com/api/' : 'api/'
    // baseUrl: isPro ? 'http://182.61.29.222:8080/api/' : 'api/'
}