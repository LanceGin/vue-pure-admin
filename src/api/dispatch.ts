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

// 获取一键派车列表
export const generateDispatch = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateDispatch"), {
    data
  });
};

// 派车
export const dispatchCar = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("dispatchCar"), {
    data
  });
};

// 获取进口派车列表
export const getImportDispatchList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("importDispatchList"), {
    data
  });
};

// 编辑进口派车单箱子信息
export const editContainerInfo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editContainerInfo"), {
    data
  });
};

// 编辑武汉派车单箱子信息
export const editWhExport = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editWhExport"), {
    data
  });
};

// 获取出口派车列表
export const getExportDispatchList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("exportDispatchList"), {
    data
  });
};

// 批量导入出口派车单记录
export const importExportContainer = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("importExportContainer"),
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

// 生成出口派车订单
export const generateExportDispatch = (data?: object) => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("generateExportDispatch"),
    {
      data
    }
  );
};

// 批量导入派车记录
export const importDispatch = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("importDispatch"),
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

// 根据导入的箱子更新派车单
export const generateDispatchWithContainer = (data?: object) => {
  return http.request<ChangeResult>(
    "post",
    baseUrlApi("generateDispatchWithContainer"),
    {
      data
    }
  );
};

// 获取临时出口派车列表
export const exportTmpDispatchList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("exportTmpDispatchList"), {
    data
  });
};

// 临时出口派车
export const tmpDispatchCar = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("tmpDispatchCar"), {
    data
  });
};

// 获取暂落派车列表
export const tempDropDispatchList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("tempDropDispatchList"), {
    data
  });
};

// 获取武汉派车列表
export const whDispatchList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("whDispatchList"), {
    data
  });
};

// 编辑进口派车单箱子信息
export const tempDropFinish = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("tempDropFinish"), {
    data
  });
};

// 编辑进口派车单箱子信息
export const oneStepFinish = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("oneStepFinish"), {
    data
  });
};

// 放空进口派车单箱子信息
export const oneStepEmpty = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("oneStepEmpty"), {
    data
  });
};

// 编辑进口派车单箱子信息
export const oneStepRevoke = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("oneStepRevoke"), {
    data
  });
};

// 编辑进口派车单箱子信息
export const dispatchRevoke = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("dispatchRevoke"), {
    data
  });
};
