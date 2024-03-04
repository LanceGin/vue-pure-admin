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

// 费用记账
export const keepAppliedFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("keepAppliedFee"), {
    data
  });
};

// 费用撤销记账
export const cancelKeepAppliedFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("cancelKeepAppliedFee"), {
    data
  });
};

// 生成应收费
export const generateContainerFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateContainerFee"), {
    data
  });
};

// 生成打单费
export const generateOrderFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateOrderFee"), {
    data
  });
};

// 生成码头计划费
export const generatePlanningFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generatePlanningFee"), {
    data
  });
};

// 生成堆存费
export const generateStorageFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateStorageFee"), {
    data
  });
};

// 生成拖车费
export const generateDispatchFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateDispatchFee"), {
    data
  });
};

// 生成异常费
export const generateAbnormalFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateAbnormalFee"), {
    data
  });
};

// 费用审核列表
export const financeCheckList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("financeCheckList"), {
    data
  });
};

// 费用报表列表
export const financeStatList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("financeStatList"), {
    data
  });
};

// 发票列表
export const invoicetList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("invoicetList"), {
    data
  });
};

// 新增发票
export const addInvoice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addInvoice"), {
    data
  });
};

// 编辑发票
export const editInvoice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editInvoice"), {
    data
  });
};

// 设置收款日期
export const setReceiptTime = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("setReceiptTime"), {
    data
  });
};

// 删除发票
export const deleteInvoice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteInvoice"), {
    data
  });
};

// 批量导入发票
export const importInvoice = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("importInvoice"),
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

// 应付发票列表
export const payInvoicetList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("payInvoicetList"), {
    data
  });
};

// 原始应付发票列表
export const payInvoicetOrigList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("payInvoicetOrigList"), {
    data
  });
};

// 新增应付发票
export const addPayInvoice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addPayInvoice"), {
    data
  });
};

// 编辑应付发票
export const editPayInvoice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editPayInvoice"), {
    data
  });
};

// 批量登记
export const registerPayInvoice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("registerPayInvoice"), {
    data
  });
};

// 删除应付发票
export const deletePayInvoice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deletePayInvoice"), {
    data
  });
};

// 批量导入应付发票
export const importPayInvoice = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("importPayInvoice"),
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

// 获取应收费用箱子列表
export const collectionContainerList = (data?: object) => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("collectionContainerList"),
    {
      data
    }
  );
};

// 通过应收费用审核
export const approveCollection = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("approveCollection"), {
    data
  });
};

// 驳回应收费用审核
export const rejectCollection = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("rejectCollection"), {
    data
  });
};

// 通过应付费用审核
export const approvePay = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("approvePay"), {
    data
  });
};

// 驳回应付费用审核
export const rejectPay = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("rejectPay"), {
    data
  });
};
