import request from "./request";
// 获取首页数据
export const GetHomePageInfoAPI = () => request.get("/index/index");
// 获取搜索弹出框的数据
export const GetSearchPropUpDataAPI = () => request.get("/search/index");
