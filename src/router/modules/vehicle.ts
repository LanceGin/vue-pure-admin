import { $t } from "@/plugins/i18n";
import { vehicle } from "@/router/enums";

export default {
  path: "/vehicle",
  redirect: "/vehicle/vehicle_info",
  meta: {
    icon: "carbon:vehicle-api",
    title: $t("menus.vehicle"),
    rank: vehicle
  },
  children: [
    {
      path: "/vehicle/vehicle_info",
      name: "VehicleInfo",
      component: () => import("@/views/operation/motorcade/index.vue"),
      meta: {
        title: $t("menus.vehicleInfo")
      }
    },
    {
      path: "/vehicle/driver_info",
      name: "DriverInfo",
      component: () => import("@/views/operation/yard/index.vue"),
      meta: {
        title: $t("menus.driverInfo")
      }
    },
    {
      path: "/vehicle/vehicle_rate",
      name: "VehicleRate",
      component: () => import("@/views/operation/fee-collection/index.vue"),
      meta: {
        title: $t("menus.vehicleRate")
      }
    },
    {
      path: "/vehicle/oil_consumption",
      name: "OilConsumption",
      component: () => import("@/views/operation/document-check/index.vue"),
      meta: {
        title: $t("menus.oilConsumption")
      }
    }
  ]
} as RouteConfigsTable;
