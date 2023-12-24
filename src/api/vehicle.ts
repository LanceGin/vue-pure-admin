import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
// import { object } from "vue-types";

// import axios from "axios";

export type ListResult = {
  success: boolean;
  data?: {
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
