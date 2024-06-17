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

// 获取往来单位列表
export const operationLogList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("operationLogList"), {
    data
  });
};
