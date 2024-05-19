import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
// import { object } from "vue-types";

export type ListResult = {
  success: boolean;
  data?: {
    /** 列表数据 */
    result: string;
  };
};

export type ChangeResult = {
  success: boolean;
  data?: {
    // 后台返回消息
    message: string;
  };
};

// 获取中交接口
export const getSino = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("getSino"), {
    data
  });
};

// 提交eir
export const submitEir = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("submitEir"), {
    data
  });
};
