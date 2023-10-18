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
    },
    {
      path: "/operation/pick_box",
      name: "PickBox",
      component: () => import("@/views/operation/pickbox/index.vue"),
      meta: {
        title: $t("menus.pickbox")
      }
    },
    {
      path: "/operation/litering",
      meta: {
        title: "驳运"
      },
      children: [
        {
          path: "/operation/litering/ytoj",
          name: "Ytoj",
          component: () => import("@/views/operation/litering/ytoj/index.vue"),
          meta: {
            title: "阳逻-金口"
          }
        },
        {
          path: "/operation/litering/jtoy",
          name: "Jtoy",
          component: () => import("@/views/operation/litering/jtoy/index.vue"),
          meta: {
            title: "金口-阳逻"
          }
        }
      ]
    }
  ]
} as RouteConfigsTable;
