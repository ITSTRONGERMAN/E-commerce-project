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
];
export default routes;
