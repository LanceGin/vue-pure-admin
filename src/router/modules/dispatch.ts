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
      redirect: "/dispatch/car_assignation/unpacking",
      name: "CarAssignation",
      meta: {
        title: $t("menus.carAssignation")
      },
      children: [
        {
          path: "/dispatch/car_assignation/unpacking",
          name: "Unpacking",
          component: () =>
            import("@/views/dispatch/assign/unpacking/index.vue"),
          meta: {
            title: "拆箱列表"
          }
        },
        {
          path: "/dispatch/car_assignation/packing",
          name: "Packing",
          component: () => import("@/views/dispatch/assign/packing/index.vue"),
          meta: {
            title: "装箱临时派车"
          }
        }
      ]
    },
    {
      path: "/dispatch/car_assignation_status",
      name: "CarAssignationStatus",
      component: () => import("@/views/dispatch/assign-status/index.vue"),
      meta: {
        title: $t("menus.carAssignationStatus")
      }
    },
    {
      path: "/dispatch/car_assignation_list",
      redirect: "/dispatch/car_assignation_list/import",
      name: "CarAssignationList",
      meta: {
        title: "派车单查看"
      },
      children: [
        {
          path: "/dispatch/car_assignation_list/import",
          name: "Import",
          component: () =>
            import("@/views/dispatch/assign-list/import/index.vue"),
          meta: {
            title: "进口"
          }
        },
        {
          path: "/dispatch/car_assignation_list/export",
          name: "Export",
          component: () =>
            import("@/views/dispatch/assign-list/export/index.vue"),
          meta: {
            title: "出口"
          }
        },
        {
          path: "/dispatch/car_assignation_list/temp_drop",
          name: "TempDrop",
          component: () =>
            import("@/views/dispatch/assign-list/temp-drop/index.vue"),
          meta: {
            title: "暂落"
          }
        }
      ]
    }
  ]
} as RouteConfigsTable;
