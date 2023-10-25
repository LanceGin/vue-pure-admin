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
      component: () => import("@/views/vehicle/vehicle-info/index.vue"),
      meta: {
        title: $t("menus.vehicleInfo")
      }
    },
    {
      path: "/vehicle/driver_info",
      name: "DriverInfo",
      component: () => import("@/views/vehicle/driver-info/index.vue"),
      meta: {
        title: $t("menus.driverInfo")
      }
    },
    {
      path: "/vehicle/vehicle_rate",
      name: "VehicleRate",
      component: () => import("@/views/vehicle/vehicle-rate/index.vue"),
      meta: {
        title: $t("menus.vehicleRate")
      }
    },
    {
      path: "/vehicle/oil_consumption",
      name: "OilConsumption",
      component: () => import("@/views/vehicle/oil-consumption/index.vue"),
      meta: {
        title: $t("menus.oilConsumption")
      }
    },
    {
      path: "/vehicle/refuel",
      name: "Refuel",
      component: () => import("@/views/vehicle/refuel/index.vue"),
      meta: {
        title: "撬装加油"
      }
    },
    {
      path: "/vehicle/vehicle_fee",
      name: "VehicleFee",
      component: () => import("@/views/vehicle/vehicle-fee/index.vue"),
      meta: {
        title: "车辆费用"
      }
    }
  ]
} as RouteConfigsTable;
