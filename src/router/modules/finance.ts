import { $t } from "@/plugins/i18n";
import { finance } from "@/router/enums";

export default {
  path: "/finance",
  redirect: "/finance/account_keep",
  meta: {
    icon: "nimbus:money",
    title: $t("menus.finance"),
    rank: finance
  },
  children: [
    {
      path: "/finance/account_keep",
      name: "AccountKeep",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.accountKeep")
      }
    },
    {
      path: "/finance/collection_check",
      name: "CollectionCheck",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.collectionCheck")
      }
    },
    {
      path: "/finance/collection_manage",
      name: "CollectionManage",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.collectionManage")
      }
    },
    {
      path: "/finance/pay_check",
      name: "PayCheck",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.payCheck")
      }
    },
    {
      path: "/finance/pay_manage",
      name: "PayManage",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.payManage")
      }
    },
    {
      path: "/finance/prestore",
      name: "Prestore",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.prestore")
      }
    },
    {
      path: "/finance/collection_stat",
      name: "CollectionStat",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.collectionStat")
      }
    },
    {
      path: "/finance/pay_stat",
      name: "PayStat",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.payStat")
      }
    },
    {
      path: "/finance/invoice",
      name: "Invoice",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.invoice")
      }
    },
    {
      path: "/statics/pay_invoice",
      name: "PayInvoice",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.payInvoice")
      }
    }
  ]
} as RouteConfigsTable;
