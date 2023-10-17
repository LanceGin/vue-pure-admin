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
      path: "/manager/transport_report",
      name: "TransportReport",
      component: () => import("@/views/welcome/index.vue"),
      meta: {
        title: $t("menus.transportReport")
      }
    },
    {
      path: "/manager/operation_report",
      name: "OperationReport",
      component: () => import("@/views/welcome/index.vue"),
      meta: {
        title: $t("menus.operationReport")
      }
    }
  ]
} as RouteConfigsTable;
