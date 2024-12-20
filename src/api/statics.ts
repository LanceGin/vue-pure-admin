import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
// import { object } from "vue-types";

export type ListResult = {
  success: boolean;
  data?: {
    forEach(arg0: (element: any) => void): unknown;
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    total_amount?: string;
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

// 获取门点价格列表
export const getDoorPriceList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("doorPriceList"), {
    data
  });
};

// 新增门点价格
export const addDoorPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addDoorPrice"), {
    data
  });
};

// 批量导入门点价格
export const importDoorPrice = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("importDoorPrice"),
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

// 删除门点价格
export const deleteDoorPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteDoorPrice"), {
    data
  });
};

// 编辑门点价格
export const editDoorPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editDoorPrice"), {
    data
  });
};

// 获取驳运价格列表
export const lighteringPriceList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("lighteringPriceList"), {
    data
  });
};

// 新增驳运价格
export const addLighteringPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addLighteringPrice"), {
    data
  });
};

// 删除驳运价格
export const deleteLighteringPrice = (data?: object) => {
  return http.request<ChangeResult>(
    "post",
    baseUrlApi("deleteLighteringPrice"),
    {
      data
    }
  );
};

// 编辑驳运价格
export const editLighteringPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editLighteringPrice"), {
    data
  });
};

// 获取陆运运价格列表
export const landPriceList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("landPriceList"), {
    data
  });
};

// 新增陆运运价格
export const addLandPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addLandPrice"), {
    data
  });
};

// 删除陆运运价格
export const deleteLandPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteLandPrice"), {
    data
  });
};

// 编辑陆运运价格
export const editLandPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editLandPrice"), {
    data
  });
};

// 获取散货价格列表
export const bulkPriceList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("bulkPriceList"), {
    data
  });
};

// 新增散货价格
export const addBulkPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addBulkPrice"), {
    data
  });
};

// 删除散货价格
export const deleteBulkPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteBulkPrice"), {
    data
  });
};

// 编辑散货价格
export const editBulkPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editBulkPrice"), {
    data
  });
};

// 获取统计费用列表
export const containerFeeList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("containerFeeList"), {
    data
  });
};

// 确认统计费用
export const confirmContainerFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("confirmContainerFee"), {
    data
  });
};

// 撤销确认统计费用
export const revokeContainerFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("revokeContainerFee"), {
    data
  });
};

// 提交统计费用
export const submitContainerFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("submitContainerFee"), {
    data
  });
};

// 应收数据比对
export const dataCheckCollection = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("dataCheckCollection"),
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

// 应付数据比对
export const dataCheckPay = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("dataCheckPay"),
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

// 设置发票号
export const setInvoiceNo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("setInvoiceNo"), {
    data
  });
};

// 设置金额
export const setAmount = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("setAmount"), {
    data
  });
};

// 设置备注
export const setRemark = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("setRemark"), {
    data
  });
};

// 获取车辆费用统计列表
export const vehicleFeeStatList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("vehicleFeeStatList"), {
    data
  });
};

// 业务量统计列表
export const dispatchStatList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("dispatchStatList"), {
    data
  });
};
