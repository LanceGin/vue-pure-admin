import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
// import { object } from "vue-types";

// import axios from "axios";

export type ListResult = {
  success: boolean;
  data?: {
    remain_oil: number;
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

export type ChangeResult = {
  success: boolean;
  data?: {
    // 后台返回消息
    message: string;
  };
};

// 获取车辆信息列表
export const vehicleInfoList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("vehicleInfoList"), {
    data
  });
};

// 新增车辆
export const addVehicleInfo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addVehicleInfo"), {
    data
  });
};

// 批量导入车辆
export const importVehicleInfo = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("importVehicleInfo"),
    {
      data
    },
    {
      transformRequest: [
        function (data, headers) {
          delete headers["Content-Type"];
          return data;
        }
      ]
    }
  );
};

// 删除车辆
export const deleteVehicleInfo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteVehicleInfo"), {
    data
  });
};

// 编辑车辆
export const editVehicleInfo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editVehicleInfo"), {
    data
  });
};

// 获取司机信息列表
export const driverInfoList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("driverInfoList"), {
    data
  });
};

// 新增司机
export const addDriverInfo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addDriverInfo"), {
    data
  });
};

// 批量导入司机
export const importDriverInfo = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("importDriverInfo"),
    {
      data
    },
    {
      transformRequest: [
        function (data, headers) {
          delete headers["Content-Type"];
          return data;
        }
      ]
    }
  );
};

// 删除司机
export const deleteDriverInfo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteDriverInfo"), {
    data
  });
};

// 编辑司机
export const editDriverInfo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editDriverInfo"), {
    data
  });
};

// 获取车辆额外信息列表
export const vehicleExtraInfoList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("vehicleExtraInfoList"), {
    data
  });
};

// 新增车辆额外信息
export const addVehicleExtraInfo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addVehicleExtraInfo"), {
    data
  });
};

// 删除车辆额外信息
export const deleteVehicleExtraInfo = (data?: object) => {
  return http.request<ChangeResult>(
    "post",
    baseUrlApi("deleteVehicleExtraInfo"),
    {
      data
    }
  );
};

// 编辑车辆额外信息
export const editVehicleExtraInfo = (data?: object) => {
  return http.request<ChangeResult>(
    "post",
    baseUrlApi("editVehicleExtraInfo"),
    {
      data
    }
  );
};

// 获取油耗核算列表
export const oilConsumptionList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("oilConsumptionList"), {
    data
  });
};

// 新增油耗核算
export const addOilConsumption = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addOilConsumption"), {
    data
  });
};

// 删除油耗核算
export const deleteOilConsumption = (data?: object) => {
  return http.request<ChangeResult>(
    "post",
    baseUrlApi("deleteOilConsumption"),
    {
      data
    }
  );
};

// 编辑油耗核算
export const editOilConsumption = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editOilConsumption"), {
    data
  });
};

// 获取撬装加油列表
export const vehicleRefuelList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("vehicleRefuelList"), {
    data
  });
};

// 新增撬装加油
export const addVehicleRefuel = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addVehicleRefuel"), {
    data
  });
};

// 删除撬装加油
export const deleteVehicleRefuel = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteVehicleRefuel"), {
    data
  });
};

// 编辑撬装加油
export const editVehicleRefuel = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editVehicleRefuel"), {
    data
  });
};

// 获取车辆费用列表
export const vehicleFeeList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("vehicleFeeList"), {
    data
  });
};

// 新增车辆费用
export const addVehicleFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addVehicleFee"), {
    data
  });
};

// 提交车辆费用
export const submitVehicleFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("submitVehicleFee"), {
    data
  });
};

// 删除车辆费用
export const deleteVehicleFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteVehicleFee"), {
    data
  });
};

// 编辑车辆费用
export const editVehicleFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editVehicleFee"), {
    data
  });
};
