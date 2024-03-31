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

// 获取往来单位列表
export const accCompanyList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("accCompanyList"), {
    data
  });
};

// 新增往来单位
export const addAccCompany = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addAccCompany"), {
    data
  });
};

// 删除往来单位
export const deleteAccCompany = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteAccCompany"), {
    data
  });
};

// 编辑往来单位
export const editAccCompany = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editAccCompany"), {
    data
  });
};

// 获取工作报告列表
export const reportList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("reportList"), {
    data
  });
};

// 新增工作报告
export const addReport = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addReport"), {
    data
  });
};

// 删除工作报告
export const deleteReport = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteReport"), {
    data
  });
};

// 编辑工作报告
export const editReport = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editReport"), {
    data
  });
};

// 提交工作报告
export const submitReport = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("submitReport"), {
    data
  });
};

// 获取合同列表
export const contractList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("contractList"), {
    data
  });
};

// 新增合同
export const addContract = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addContract"), {
    data
  });
};

// 删除合同
export const deleteContract = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteContract"), {
    data
  });
};

// 编辑合同
export const editContract = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editContract"), {
    data
  });
};

// 获取费用申请列表
export const appliedFeeList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("appliedFeeList"), {
    data
  });
};

// 新增费用申请
export const addAppliedFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addAppliedFee"), {
    data
  });
};

// 删除费用申请
export const deleteAppliedFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteAppliedFee"), {
    data
  });
};

// 编辑费用申请
export const editAppliedFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editAppliedFee"), {
    data
  });
};

// 提交费用申请
export const submitAppliedFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("submitAppliedFee"), {
    data
  });
};

// 编辑进口派车单箱子信息
export const revokeAppliedFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("revokeAppliedFee"), {
    data
  });
};
