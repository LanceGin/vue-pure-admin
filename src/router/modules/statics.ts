import { $t } from "@/plugins/i18n";
import { statics } from "@/router/enums";

export default {
  path: "/statics",
  redirect: "/statics/collection_price",
  meta: {
    icon: "histogram",
    title: $t("menus.statics"),
    rank: statics
  },
  children: [
    {
      path: "/statics/lightering_price",
      name: "LighteringPrice",
      component: () => import("@/views/statics/lightering-price/index.vue"),
      meta: {
        title: "驳运价格",
        roles: ["admin", "statics", "lightering_price"]
      }
    },
    {
      path: "/statics/collection_price",
      name: "CollectionPrice",
      component: () => import("@/views/statics/collection-price/index.vue"),
      meta: {
        title: $t("menus.collectionPrice"),
        roles: ["admin", "statics", "collection_price"]
      }
    },
    {
      path: "/statics/pay_price",
      name: "PayPrice",
      component: () => import("@/views/statics/pay-price/index.vue"),
      meta: {
        title: $t("menus.payPrice"),
        roles: ["admin", "statics", "pay_price"]
      }
    },
    {
      path: "/statics/recievable",
      name: "Recievable",
      component: () => import("@/views/statics/recievable/index.vue"),
      meta: {
        title: $t("menus.recievable"),
        roles: ["admin", "statics", "recievable"]
      }
    },
    {
      path: "/statics/payable",
      name: "payable",
      component: () => import("@/views/statics/payable/index.vue"),
      meta: {
        title: $t("menus.payable"),
        roles: ["admin", "statics", "payable"]
      }
    },
    {
      path: "/statics/vehicle_fee_stat",
      name: "VehicleFeeStat",
      component: () => import("@/views/statics/vehicle-fee-stat/index.vue"),
      meta: {
        title: "车辆费用统计",
        roles: ["admin", "statics", "vehicle_fee_stat"]
      }
    }
  ]
} as RouteConfigsTable;
