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
export const getMotorcadeList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("motorcadeList"), {
    data
  });
};

// 新增客户
export const addMotorcade = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addMotorcade"), {
    data
  });
};

// 删除客户
export const deleteMotorcade = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteMotorcade"), {
    data
  });
};

// 编辑客户
export const editMotorcade = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editMotorcade"), {
    data
  });
};

// 获取堆场列表
export const getYardList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("yardList"), {
    data
  });
};

// 新增堆场
export const addYard = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addYard"), {
    data
  });
};

// 删除堆场
export const deleteYard = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteYard"), {
    data
  });
};

// 编辑堆场
export const editYard = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editYard"), {
    data
  });
};
