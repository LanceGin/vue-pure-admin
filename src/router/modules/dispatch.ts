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
            title: "拆箱暂落列表",
            keepAlive: true,
            roles: ["admin", "dispatch", "unpacking"]
          }
        },
        {
          path: "/dispatch/car_assignation/packing",
          name: "Packing",
          component: () => import("@/views/dispatch/assign/packing/index.vue"),
          meta: {
            title: "装箱临时派车",
            keepAlive: true,
            roles: ["admin", "dispatch", "packing"]
          }
        }
      ]
    },
    {
      path: "/dispatch/car_assignation_list",
      redirect: "/dispatch/car_assignation_list/import",
      name: "CarAssignationList",
      meta: {
        title: "派车单管理"
      },
      children: [
        {
          path: "/dispatch/car_assignation_list/import",
          name: "Import",
          component: () =>
            import("@/views/dispatch/assign-list/import/index.vue"),
          meta: {
            title: "进口",
            keepAlive: true,
            roles: ["admin", "dispatch", "import"]
          }
        },
        {
          path: "/dispatch/car_assignation_list/export",
          name: "Export",
          component: () =>
            import("@/views/dispatch/assign-list/export/index.vue"),
          meta: {
            title: "出口",
            keepAlive: true,
            roles: ["admin", "dispatch", "export"]
          }
        },
        {
          path: "/dispatch/car_assignation_list/temp_drop",
          name: "TempDrop",
          component: () =>
            import("@/views/dispatch/assign-list/temp-drop/index.vue"),
          meta: {
            title: "暂落",
            keepAlive: true,
            roles: ["admin", "dispatch", "temp_drop"]
          }
        },
        {
          path: "/dispatch/car_assignation_list/wh",
          name: "WH",
          component: () => import("@/views/dispatch/assign-list/wh/index.vue"),
          meta: {
            title: "武汉派车单",
            keepAlive: true,
            roles: ["admin", "dispatch", "wh_dispatch"]
          }
        }
      ]
    },
    {
      path: "/iframe/transport",
      name: "FrametTransport",
      component: () => import("@/layout/frameView.vue"),
      meta: {
        title: "运输节点服务",
        frameSrc: "transportManage",
        roles: ["admin", "dispatch", "transport_manage"]
      }
    },
    {
      path: "/iframe/path",
      name: "FramePath",
      component: () => import("@/layout/frameView.vue"),
      meta: {
        title: "运输行程服务",
        frameSrc: "pathTrack",
        roles: ["admin", "dispatch", "path_track"]
      }
    }
  ]
} as RouteConfigsTable;
