import { $t } from "@/plugins/i18n";
import { dispatch } from "@/router/enums";

export default {
  path: "/dispatch",
  redirect: "/dispatch/car_assignation",
  meta: {
    icon: "carbon:operations-record",
    title: $t("menus.dispatch"),
    rank: dispatch
  },
  children: [
    {
      path: "/dispatch/car_assignation",
      name: "CarAssignation",
      component: () => import("@/views/operation/motorcade/index.vue"),
      meta: {
        title: $t("menus.carAssignation")
      }
    },
    {
      path: "/dispatch/car_assignation_status",
      name: "CarAssignationStatus",
      component: () => import("@/views/operation/yard/index.vue"),
      meta: {
        title: $t("menus.carAssignationStatus")
      }
    },
    {
      path: "/dispatch/document_info",
      name: "DocumentInfo",
      component: () => import("@/views/operation/fee-collection/index.vue"),
      meta: {
        title: $t("menus.documentInfo")
      }
    },
    {
      path: "/dispatch/pickbox",
      name: "pickbox",
      component: () => import("@/views/operation/document-check/index.vue"),
      meta: {
        title: $t("menus.pickbox")
      }
    }
  ]
} as RouteConfigsTable;
