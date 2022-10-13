import request from './request'
// 获取首页信息
export const GetHomePageInfo=()=>request.get('/index/index')