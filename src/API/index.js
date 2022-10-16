import request from "./request";
// 获取首页数据
export const GetHomePageInfoAPI = () => request.get("/index/index");
// 获取搜索弹出框的数据
export const GetSearchPropUpDataAPI = () => request.get("/search/index");
// 获取搜索提示信息
export const GetSearchTipsApI = (params) =>
  request.get("/search/helper", {
    params,
  });
// 获取商品列表信息
export const GetGoodsListAPI = (params) =>
  request.get("/goods/list", { params });
// 删除历史记录
export const ClearHistoyAPI = () => request.post("/search/clearhistory");
