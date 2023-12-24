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
