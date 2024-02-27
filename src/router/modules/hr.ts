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
        title: "运作人员考核"
      }
    },
    {
      path: "/hr/check_point",
      name: "CheckPoint",
      component: () => import("@/views/hr/check-point/index.vue"),
      meta: {
        title: "打卡点管理"
      }
    },
    {
      path: "/hr/staff",
      name: "Staff",
      component: () => import("@/views/hr/staff/index.vue"),
      meta: {
        title: $t("menus.staff")
      }
    },
    {
      path: "/hr/check_on",
      name: "CheckOn",
      component: () => import("@/views/hr/check-on/index.vue"),
      meta: {
        title: $t("menus.checkOn")
      }
    }
  ]
} as RouteConfigsTable;
