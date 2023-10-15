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
      path: "/daily/fee_application",
      name: "FeeApplication",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.feeApplication")
      }
    },
    {
      path: "/daily/contract",
      name: "Contract",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: $t("menus.contract")
      }
    }
  ]
} as RouteConfigsTable;
