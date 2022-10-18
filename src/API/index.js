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
// 登录请求
export const UserLoginApI = (params) =>
  request.post("/auth/loginByWeb", params);
// 商品详情
export const GetGoodsDetailAPI = (params) =>
  request.get("/goods/detail", {
    params,
  });
//商品详情相关产品
export const GetRelativeGoodsAPI = (params) =>
  request.get("/goods/related", { params });
// 获取购物车数量
export const GetCartCountAPI = () => request.get("/cart/goodscount");
// 加入购物车
export const AddCartAPI = (params) => request.post("/cart/add", params);
// 获取购物车数据
export const GetCartDataAPI = () => request.get("/cart/index");
// 点击切换商品选中状态（含全选）
export const ChangeCheckAllAPI = (params) =>
  request.post("/cart/checked", params);
// 商品步进器修改
export const ChangeStepperNumAPI = (params) =>
  request.post("/cart/update", params);
// 删除商品
export const DeleteGoodsAPI = (params) => request.post("/cart/delete", params);
