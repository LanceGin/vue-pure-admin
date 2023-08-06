import { $t } from "@/plugins/i18n";
import { operation } from "@/router/enums";

export default {
  path: "/operation",
  redirect: "/operation/motorcade",
  meta: {
    icon: "edit",
    title: $t("menus.operation"),
    rank: operation
  },
  children: [
    {
      path: "/operation/motorcade",
      name: "Motorcade",
      component: () => import("@/views/operation/motorcade/index.vue"),
      meta: {
        title: $t("menus.motorcade")
      }
    },
    {
      path: "/operation/yard",
      name: "Yard",
      component: () => import("@/views/operation/yard/index.vue"),
      meta: {
        title: $t("menus.yard")
      }
    },
    {
      path: "/operation/fee_collection",
      name: "FeeCollection",
      component: () => import("@/views/operation/fee-collection/index.vue"),
      meta: {
        title: $t("menus.feeCollection")
      }
    },
    {
      path: "/operation/document_check",
      name: "DocumenCheck",
      component: () => import("@/views/operation/document-check/index.vue"),
      meta: {
        title: $t("menus.documentCheck")
      }
    }
  ]
} as RouteConfigsTable;
