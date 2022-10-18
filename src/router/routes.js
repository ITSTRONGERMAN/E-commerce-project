import Home from "@/views/Home.vue";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      isShowAppTabBar: true,
    },
    children: [
      {
        path: "searchpopup",
        name: "searchpopup",
        component: () => import("@/views/SearchPopup"),
        meta: {
          isShowAppTabBar: false,
        },
      },
    ],
  },
  {
    path: "/special",
    name: "special",
    component: () => import("@/views/Special.vue"),
    meta: {
      isShowAppTabBar: true,
    },
  },
  {
    path: "/category",
    name: "category",
    component: () => import("@/views/Category.vue"),
    meta: {
      isShowAppTabBar: true,
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/Cart.vue"),
    meta: {
      isShowAppTabBar: true,
    },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/User.vue"),
    meta: {
      isShowAppTabBar: true,
    },
  },
  {
    path: "/goodsdetail",
    name: "goodsdetail",
    component: () => import("@/views/GoodsDetail.vue"),
    meta: {
      isShowAppTabBar: false,
    },
  },
];
export default routes;
