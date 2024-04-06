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
        title: $t("menus.accountKeep"),
        keepAlive: true,
        roles: ["admin", "finance", "account_keep"]
      }
    },
    {
      path: "/finance/fee_name",
      name: "FeeName",
      component: () => import("@/views/finance/fee-name/index.vue"),
      meta: {
        title: "费用名维护",
        keepAlive: true,
        roles: ["admin", "finance", "fee_name"]
      }
    },
    {
      path: "/finance/collection_check",
      name: "CollectionCheck",
      component: () => import("@/views/finance/collection-check/index.vue"),
      meta: {
        title: $t("menus.collectionCheck"),
        keepAlive: true,
        roles: ["admin", "finance", "collection_check"]
      }
    },
    {
      path: "/finance/pay_check",
      name: "PayCheck",
      component: () => import("@/views/finance/pay-check/index.vue"),
      meta: {
        title: $t("menus.payCheck"),
        keepAlive: true,
        roles: ["admin", "finance", "pay_check"]
      }
    },
    {
      path: "/finance/collection_manage",
      name: "CollectionManage",
      component: () => import("@/views/finance/collection-manage/index.vue"),
      meta: {
        title: $t("menus.collectionManage"),
        keepAlive: true,
        roles: ["admin", "finance", "collection_manage"]
      }
    },
    {
      path: "/finance/pay_manage",
      name: "PayManage",
      component: () => import("@/views/finance/pay-manage/index.vue"),
      meta: {
        title: $t("menus.payManage"),
        keepAlive: true,
        roles: ["admin", "finance", "pay_manage"]
      }
    },
    {
      path: "/finance/collection_stat",
      name: "CollectionStat",
      component: () => import("@/views/finance/collection-stat/index.vue"),
      meta: {
        title: $t("menus.collectionStat"),
        keepAlive: true,
        roles: ["admin", "finance", "collection_stat"]
      }
    },
    {
      path: "/finance/pay_stat",
      name: "PayStat",
      component: () => import("@/views/finance/pay-stat/index.vue"),
      meta: {
        title: $t("menus.payStat"),
        keepAlive: true,
        roles: ["admin", "finance", "pay_stat"]
      }
    },
    {
      path: "/finance/prestore",
      name: "Prestore",
      component: () => import("@/views/finance/prestore/index.vue"),
      meta: {
        title: $t("menus.prestore"),
        keepAlive: true,
        roles: ["admin", "finance", "prestore"]
      }
    },
    {
      path: "/finance/invoice",
      name: "Invoice",
      component: () => import("@/views/finance/invoice/index.vue"),
      meta: {
        title: $t("menus.invoice"),
        keepAlive: true,
        roles: ["admin", "finance", "invoice"]
      }
    },
    {
      path: "/statics/pay_invoice",
      name: "PayInvoice",
      component: () => import("@/views/finance/pay-invoice/index.vue"),
      meta: {
        title: $t("menus.payInvoice"),
        keepAlive: true,
        roles: ["admin", "finance", "pay_invoice"]
      }
    },
    {
      path: "/statics/pay_invoice_orig",
      name: "PayInvoiceOrig",
      component: () => import("@/views/finance/pay-invoice-orig/index.vue"),
      meta: {
        title: "原始发票管理",
        keepAlive: true,
        roles: ["admin", "finance", "pay_invoice_orig"]
      }
    }
  ]
} as RouteConfigsTable;
