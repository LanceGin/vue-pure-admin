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
      path: "/operation/bulk",
      meta: {
        title: "其他业务管理"
      },
      children: [
        {
          path: "/operation/bulk/shipping",
          name: "Shipping",
          component: () => import("@/views/operation/bulk/shipping/index.vue"),
          meta: {
            title: "船运"
          }
        },
        {
          path: "/operation/bulk/land_trans",
          name: "LandTrans",
          component: () =>
            import("@/views/operation/bulk/land-trans/index.vue"),
          meta: {
            title: "陆运"
          }
        },
        {
          path: "/operation/bulk/bulk",
          name: "Bulk",
          component: () => import("@/views/operation/bulk/bulk/index.vue"),
          meta: {
            title: "散货"
          }
        }
      ]
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
      path: "/operation/container_done",
      name: "ContainerDone",
      component: () => import("@/views/operation/container-done/index.vue"),
      meta: {
        title: "单据查看"
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
      path: "/operation/lightering",
      meta: {
        title: "驳运"
      },
      children: [
        {
          path: "/operation/lightering/ytoj",
          name: "Ytoj",
          component: () =>
            import("@/views/operation/lightering/ytoj/index.vue"),
          meta: {
            title: "阳逻-金口"
          }
        },
        {
          path: "/operation/lightering/jtoy",
          name: "Jtoy",
          component: () =>
            import("@/views/operation/lightering/jtoy/index.vue"),
          meta: {
            title: "金口-阳逻"
          }
        },
        {
          path: "/operation/lightering/stat",
          name: "LighteringStat",
          component: () =>
            import("@/views/operation/lightering/stat/index.vue"),
          meta: {
            title: "驳运统计"
          }
        }
      ]
    }
  ]
} as RouteConfigsTable;
