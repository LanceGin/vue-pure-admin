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

export type ShowResult = {
  success: boolean;
  data?: {
    /** 列表数据 */
    result: Array<any>;
  };
};

export type ChangeResult = {
  success: boolean;
  data?: {
    // 后台返回消息
    message: string;
  };
};

// 上传水单接口
export const uploadReciept = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("uploadReciept"),
    {
      data
    },
    {
      transformRequest: [
        function (data, headers) {
          delete headers["Content-Type"];
          return data;
        }
      ]
    }
  );
};

// 查看水单接口
export const showReciept = (data?: object) => {
  return http.request<ShowResult>("post", baseUrlApi("showReciept"), {
    data
  });
};

// 删除水单接口
export const deleteReciept = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("deleteReciept"), {
    data
  });
};

// 获取中交接口
export const getSino = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("getSino"), {
    data
  });
};

// 同步eir
export const syncEir = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("syncEir"), {
    data
  });
};

// 提交eir
export const submitEir = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("submitEir"), {
    data
  });
};

// eir转单
export const transferEir = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("transferEir"), {
    data
  });
};
