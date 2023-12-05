import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
// import { object } from "vue-types";

// import axios from "axios";

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

// 获取代收费用列表
export const getFeeCollectionList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("feeCollectionList"), {
    data
  });
};

// 新增代收费用
export const addFeeCollection = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addFeeCollection"), {
    data
  });
};

// 删除代收费用
export const deleteFeeCollection = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteFeeCollection"), {
    data
  });
};

// 编辑代收费用
export const editFeeCollection = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editFeeCollection"), {
    data
  });
};

// 获取散货记录列表
export const getBulkCargoList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("bulkCargoList"), {
    data
  });
};

// 新增散货记录
export const addBulkCargo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addBulkCargo"), {
    data
  });
};

// 删除散货记录
export const deleteBulkCargo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteBulkCargo"), {
    data
  });
};

// 编辑散货记录
export const editBulkCargo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editBulkCargo"), {
    data
  });
};

// 获取驳运列表
export const getLighteringList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("lighteringList"), {
    data
  });
};

// 获取单证记录
export const getDocumentCheckList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("documentCheckList"), {
    data
  });
};

// 批量导入单证记录
export const importDocumentCheck = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("importDocumentCheck"),
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
  // return axios.post(baseUrlApi("importDocumentCheck"), formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //   }
  // });
};

// 提交单证记录
export const submitDocumentCheck = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("submitdocumentCheck"), {
    data
  });
};

// 获取挑箱列表
export const getPickBoxList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("pickBoxList"), {
    data
  });
};

// 挑箱
export const pickBox = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("pickBox"), {
    data
  });
};
