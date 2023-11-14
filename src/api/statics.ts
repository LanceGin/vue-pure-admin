import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
// import { object } from "vue-types";

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

// 获取车队客户列表
export const getDoorPriceList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("doorPriceList"), {
    data
  });
};

// 新增客户
export const addDoorPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addDoorPrice"), {
    data
  });
};

// 删除客户
export const deleteDoorPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteDoorPrice"), {
    data
  });
};

// 编辑客户
export const editDoorPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editDoorPrice"), {
    data
  });
};
