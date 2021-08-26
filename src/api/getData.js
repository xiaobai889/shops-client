import getData from './index.js'
import axios from 'axios'

export const address = (geohash) => getData('position/'+ geohash)

export const categorys = () => getData('index_category')

export const shops = (address) => getData('shops','?' + address)

// 6、用户名密码登陆http://localhost:4000/login_pwd
export const login_pwd = ({name,pwd,captcha}) => getData('login_pwd',{name,pwd,captcha})

// 发送短信验证码
export const sendcode = (phone) => getData('sendcode','?phone=' + phone)

// 手机号验证码登陆
export const login_sms = ({phone,code}) => getData('login_sms',{phone,code})

// 根据会话获取用户信息
export const userinfo = () => getData('userinfo')

// 用户登出
export const loginout = () => getData('logout')

// 获取shop区
export const shopGoods = () => axios.get('/shop_goods')
export const shopInfo = () => axios.get('/shop_info')
export const shopRatings = () => axios.get('/shop_ratings')

// 根据经纬度和关键字搜索商铺列表
export const SearchShops = (keyword,geohash) => getData('search_shops',`?keyword=${keyword}&geohash=${geohash}`)