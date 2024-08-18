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
        keepAlive: true,
        roles: ["admin", "statics", "lightering_price"]
      }
    },
    // {
    //   path: "/statics/land_price",
    //   name: "LandPrice",
    //   component: () => import("@/views/statics/land-price/index.vue"),
    //   meta: {
    //     title: "陆运价格",
    //     keepAlive: true,
    //     roles: ["admin", "statics", "land_price"]
    //   }
    // },
    {
      path: "/statics/bulk_price",
      name: "BulkPrice",
      component: () => import("@/views/statics/bulk-price/index.vue"),
      meta: {
        title: "陆运/散货价格",
        keepAlive: true,
        roles: ["admin", "statics", "bulk_price", "land_price"]
      }
    },
    {
      path: "/statics/collection_price",
      name: "CollectionPrice",
      component: () => import("@/views/statics/collection-price/index.vue"),
      meta: {
        title: $t("menus.collectionPrice"),
        keepAlive: true,
        roles: ["admin", "statics", "collection_price"]
      }
    },
    {
      path: "/statics/pay_price",
      name: "PayPrice",
      component: () => import("@/views/statics/pay-price/index.vue"),
      meta: {
        title: $t("menus.payPrice"),
        keepAlive: true,
        roles: ["admin", "statics", "pay_price"]
      }
    },
    {
      path: "/statics/recievable",
      name: "Recievable",
      component: () => import("@/views/statics/recievable/index.vue"),
      meta: {
        title: $t("menus.recievable"),
        keepAlive: true,
        roles: ["admin", "statics", "recievable"]
      }
    },
    {
      path: "/statics/payable",
      name: "Payable",
      component: () => import("@/views/statics/payable/index.vue"),
      meta: {
        title: $t("menus.payable"),
        keepAlive: true,
        roles: ["admin", "statics", "payable"]
      }
    },
    {
      path: "/statics/vehicle_fee_stat",
      name: "VehicleFeeStat",
      component: () => import("@/views/statics/vehicle-fee-stat/index.vue"),
      meta: {
        title: "车辆费用统计",
        keepAlive: true,
        roles: ["admin", "statics", "vehicle_fee_stat"]
      }
    },
    {
      path: "/statics/dispatch_stat",
      name: "DispatchStat",
      component: () => import("@/views/statics/dispatch-stat/index.vue"),
      meta: {
        title: "业务量统计",
        keepAlive: true,
        roles: ["admin", "statics", "dispatch_stat"]
      }
    }
  ]
} as RouteConfigsTable;
