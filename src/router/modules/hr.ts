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
