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

// 获取车队客户列表
export const getMotorcadeList = (data?: object) => {
  return http.request<MotorcadeListResult>(
    "post",
    baseUrlApi("motorcadeList"),
    { data }
  );
};
