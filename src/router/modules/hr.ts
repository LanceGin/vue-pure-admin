import { $t } from "@/plugins/i18n";
import { hr } from "@/router/enums";

export default {
  path: "/hr",
  redirect: "/hr/staff",
  meta: {
    icon: "icon-park-outline:file-staff",
    title: $t("menus.hr"),
    rank: hr
  },
  children: [
    {
      path: "/hr/check",
      name: "Check",
      component: () => import("@/views/hr/check/index.vue"),
      meta: {
        title: "运作人员考核",
        keepAlive: true,
        roles: ["admin", "hr", "check"]
      }
    },
    {
      path: "/hr/check_point",
      name: "CheckPoint",
      component: () => import("@/views/hr/check-point/index.vue"),
      meta: {
        title: "打卡点管理",
        keepAlive: true,
        roles: ["admin", "hr", "check_point"]
      }
    },
    {
      path: "/hr/staff",
      name: "Staff",
      component: () => import("@/views/hr/staff/index.vue"),
      meta: {
        title: $t("menus.staff"),
        keepAlive: true,
        roles: ["admin", "hr", "staff"]
      }
    },
    {
      path: "/hr/check_on",
      name: "CheckOn",
      component: () => import("@/views/hr/check-on/index.vue"),
      meta: {
        title: $t("menus.checkOn"),
        keepAlive: true,
        roles: ["admin", "hr", "checkon"]
      }
    }
  ]
} as RouteConfigsTable;
