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
      component: () => import("@/views/finance/account-keep/index.vue"),
      meta: {
        title: $t("menus.accountKeep")
      }
    },
    {
      path: "/finance/collection_check",
      name: "CollectionCheck",
      component: () => import("@/views/finance/collection-check/index.vue"),
      meta: {
        title: $t("menus.collectionCheck")
      }
    },
    {
      path: "/finance/pay_check",
      name: "PayCheck",
      component: () => import("@/views/finance/pay-check/index.vue"),
      meta: {
        title: $t("menus.payCheck")
      }
    },
    {
      path: "/finance/collection_manage",
      name: "CollectionManage",
      component: () => import("@/views/finance/collection-manage/index.vue"),
      meta: {
        title: $t("menus.collectionManage")
      }
    },
    {
      path: "/finance/pay_manage",
      name: "PayManage",
      component: () => import("@/views/finance/pay-manage/index.vue"),
      meta: {
        title: $t("menus.payManage")
      }
    },
    {
      path: "/finance/collection_stat",
      name: "CollectionStat",
      component: () => import("@/views/finance/collection-stat/index.vue"),
      meta: {
        title: $t("menus.collectionStat")
      }
    },
    {
      path: "/finance/pay_stat",
      name: "PayStat",
      component: () => import("@/views/finance/pay-stat/index.vue"),
      meta: {
        title: $t("menus.payStat")
      }
    },
    {
      path: "/finance/prestore",
      name: "Prestore",
      component: () => import("@/views/finance/prestore/index.vue"),
      meta: {
        title: $t("menus.prestore")
      }
    },
    {
      path: "/finance/invoice",
      name: "Invoice",
      component: () => import("@/views/finance/invoice/index.vue"),
      meta: {
        title: $t("menus.invoice")
      }
    },
    {
      path: "/statics/pay_invoice",
      name: "PayInvoice",
      component: () => import("@/views/finance/pay-invoice/index.vue"),
      meta: {
        title: $t("menus.payInvoice")
      }
    },
    {
      path: "/statics/pay_invoice_orig",
      name: "PayInvoiceOrig",
      component: () => import("@/views/finance/pay-invoice-orig/index.vue"),
      meta: {
        title: "原始发票管理"
      }
    }
  ]
} as RouteConfigsTable;
