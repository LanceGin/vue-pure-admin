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

// 费用记账
export const keepAppliedFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("keepAppliedFee"), {
    data
  });
};

// 费用撤销记账
export const cancelKeepAppliedFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("cancelKeepAppliedFee"), {
    data
  });
};

// 生成打单费
export const generateOrderFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateOrderFee"), {
    data
  });
};

// 生成码头计划费
export const generatePlanningFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generatePlanningFee"), {
    data
  });
};

// 生成堆存费
export const generateStorageFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateStorageFee"), {
    data
  });
};

// 生成拖车费
export const generateDispatchFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateDispatchFee"), {
    data
  });
};

// 生成异常费
export const generateAbnormalFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateAbnormalFee"), {
    data
  });
};

// 费用审核列表
export const financeCheckList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("financeCheckList"), {
    data
  });
};
