import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import AddOrderPage from "../views/AddOrderPage.vue";
import OrderPage from "../views/OrderPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import ChatPage from "../views/ChatPage.vue";
import FormUpload from "../views/FormUpload.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/orders",
      name: "order",
      component: OrderPage,
    },
    {
      path: "/items/:id",
      name: "addOrder",
      component: AddOrderPage,
    },
    {
      path: "/chats/:id",
      name: "chat",
      component: ChatPage,
    },
    {
      path: "/image/:id",
      name: "uploadImage",
      component: FormUpload,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: NotFoundPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("access_token");
  if (isAuthenticated && to.name === "login") {
    next({ name: "home" });
  } else if (
    !isAuthenticated &&
    (to.name === "home" ||
      to.name === "order" ||
      to.name === "addOrder" ||
      to.name === "orderDetail")
  ) {
    next({ name: "login" });
  } else next();
});

export default router;
