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
    children: [
      {
        path: "searchpopup",
        name: "searchpopup",
        component: () => import("@/views/SearchPopup"),
      },
    ],
  },
  {
    path: "/special",
    name: "special",
    component: () => import("@/views/Special.vue"),
  },
  {
    path: "/category",
    name: "category",
    component: () => import("@/views/Category.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/Cart.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/User.vue"),
  },
];
export default routes;
