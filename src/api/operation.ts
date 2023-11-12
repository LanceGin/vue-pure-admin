import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
// import { object } from "vue-types";

export type MotorcadeListResult = {
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

export type AddMotorcadeResult = {
  success: boolean;
  data?: {
    // 后台返回消息
    message: string;
  };
};

export type DeleteMotorcadeResult = {
  success: boolean;
  data?: {
    // 后台返回消息
    message: string;
  };
};

export type EditMotorcadeResult = {
  success: boolean;
  data?: {
    // 后台返回消息
    message: string;
  };
};

// 获取车队客户列表
export const getMotorcadeList = (data?: object) => {
  return http.request<MotorcadeListResult>(
    "post",
    baseUrlApi("motorcadeList"),
    { data }
  );
};

// 新增客户
export const addMotorcade = (data?: object) => {
  return http.request<AddMotorcadeResult>("post", baseUrlApi("addMotorcade"), {
    data
  });
};

// 删除客户
export const deleteMotorcade = (data?: object) => {
  return http.request<DeleteMotorcadeResult>(
    "post",
    baseUrlApi("deleteMotorcade"),
    {
      data
    }
  );
};

// 编辑客户
export const editMotorcade = (data?: object) => {
  return http.request<EditMotorcadeResult>(
    "post",
    baseUrlApi("editMotorcade"),
    {
      data
    }
  );
};
