import { $t } from "@/plugins/i18n";
import { daily } from "@/router/enums";

export default {
  path: "/daily",
  redirect: "/daily/fee_application",
  meta: {
    icon: "icon-park-outline:file-staff",
    title: $t("menus.daily"),
    rank: daily
  },
  children: [
    {
      path: "/daily/custom",
      name: "Custom",
      component: () => import("@/views/daily/custom/index.vue"),
      meta: {
        title: $t("menus.custom"),
        keepAlive: true
      }
    },
    {
      path: "/daily/report",
      name: "Report",
      component: () => import("@/views/daily/report/index.vue"),
      meta: {
        keepAlive: true,
        title: "工作报告"
      }
    },
    {
      path: "/daily/fee_application",
      name: "FeeApplication",
      component: () => import("@/views/daily/fee-application/index.vue"),
      meta: {
        keepAlive: true,
        title: $t("menus.feeApplication")
      }
    },
    {
      path: "/daily/contract",
      name: "Contract",
      component: () => import("@/views/daily/contract/index.vue"),
      meta: {
        keepAlive: true,
        title: $t("menus.contract"),
        roles: ["admin", "daily", "contract"]
      }
    }
  ]
} as RouteConfigsTable;
