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

// 获取拆箱列表
export const getUnpackingList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("unpackingList"), {
    data
  });
};

// 派车
export const dispatchCar = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("dispatchCar"), {
    data
  });
};
