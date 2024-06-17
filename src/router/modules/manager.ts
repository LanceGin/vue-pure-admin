import { $t } from "@/plugins/i18n";
import { manager } from "@/router/enums";

export default {
  path: "/manager",
  redirect: "/manager/transport_report",
  meta: {
    icon: "fluent-mdl2:manager-self-service",
    title: $t("menus.manager"),
    rank: manager
  },
  children: [
    {
      path: "/manager/operation_log",
      name: "OperationLog",
      component: () => import("@/views/manager/operation-log/index.vue"),
      meta: {
        title: "操作记录",
        roles: ["admin", "operation_log"]
      }
    },
    {
      path: "/manager/transport_report",
      name: "TransportReport",
      component: () => import("@/views/manager/index.vue"),
      meta: {
        title: "汇总业务报表",
        roles: ["admin", "manager"]
      }
    },
    {
      path: "/manager/wh_transport_report",
      name: "WhTransportReport",
      component: () => import("@/views/manager/index.vue"),
      meta: {
        title: "武汉业务报表",
        roles: ["admin", "manager"]
      }
    }
  ]
} as RouteConfigsTable;
