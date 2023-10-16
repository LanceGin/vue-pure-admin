import { $t } from "@/plugins/i18n";
import { statics } from "@/router/enums";

export default {
  path: "/statics",
  redirect: "/statics/collection_price",
  meta: {
    icon: "histogram",
    title: $t("menus.statics"),
    rank: statics
  },
  children: [
    {
      path: "/statics/collection_price",
      name: "CollectionPrice",
      component: () => import("@/views/statics/collection-price/index.vue"),
      meta: {
        title: $t("menus.collectionPrice")
      }
    },
    {
      path: "/statics/pay_price",
      name: "PayPrice",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.payPrice")
      }
    },
    {
      path: "/statics/recievable",
      name: "Recievable",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.recievable")
      }
    },
    {
      path: "/statics/payable",
      name: "payable",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.payable")
      }
    }
  ]
} as RouteConfigsTable;
