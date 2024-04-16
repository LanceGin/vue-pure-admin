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

// 获取船公司列表
export const shipCompanyList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("shipCompanyList"), {
    data
  });
};

// 新增船公司
export const addShipCompany = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addShipCompany"), {
    data
  });
};

// 删除船公司
export const deleteShipCompany = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteShipCompany"), {
    data
  });
};

// 编辑船公司
export const editShipCompany = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editShipCompany"), {
    data
  });
};

// 获取堆场列表
export const getYardList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("yardList"), {
    data
  });
};

// 获取堆场价格列表
export const getYardPriceList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("yardPriceList"), {
    data
  });
};

// 新增堆场
export const addYard = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addYard"), {
    data
  });
};

// 新增堆场价格
export const addYardPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addYardPrice"), {
    data
  });
};

// 删除堆场
export const deleteYard = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteYard"), {
    data
  });
};

// 删除堆场价格
export const deleteYardPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteYardPrice"), {
    data
  });
};

// 编辑堆场
export const editYard = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editYard"), {
    data
  });
};

// 编辑堆场价格
export const editYardPrice = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editYardPrice"), {
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
  return http.request<ListResult>("post", baseUrlApi("addBulkCargo"), {
    data
  });
};

// 批量导入船运记录
export const importShipping = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("importShipping"),
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

// 生成太仓水运费列表
export const generateShippingFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateShippingFee"), {
    data
  });
};
// 删除太仓水运费列表
export const deleteShippingFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("deleteShippingFee"), {
    data
  });
};

// 生成陆运运费列表
export const generateLandingFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateLandingFee"), {
    data
  });
};
// 删除陆运运费列表
export const deleteLandingFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("deleteLandingFee"), {
    data
  });
};

// 生成散货运费列表
export const generateBulkFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateBulkFee"), {
    data
  });
};
// 删除散货运费列表
export const deleteBulkFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("deleteBulkFee"), {
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

// 获取驳运统计列表
export const getLighteringStatList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("lighteringStatList"), {
    data
  });
};

// 批量导入驳运ytoj记录
export const importYtoj = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("importYtoj"),
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

// 生成水运费列表
export const generateShipFee = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("generateShipFee"), {
    data
  });
};

// 批量导入驳运ytoj记录
export const importJtoy = data => {
  return http.request<ListResult>(
    "post",
    baseUrlApi("importJtoy"),
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

// 获取单证记录
export const getDocumentCheckList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("documentCheckList"), {
    data
  });
};

// 获取单证查看记录
export const containerWithFeeList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("containerWithFeeList"), {
    data
  });
};

// 获取箱子记录
export const getContainerList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("containerList"), {
    data
  });
};

// 获取箱子费用记录
export const getContainerFeeList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("getContainerFeeList"), {
    data
  });
};

// 获取派车单费用记录
export const getDispatchFeeList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("getDispatchFeeList"), {
    data
  });
};

// 新增箱子
export const addContainer = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addContainer"), {
    data
  });
};
// 新增箱子费用
export const addContainerFee = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addContainerFee"), {
    data
  });
};
// 修正箱子信息
export const fixContainerInfo = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("fixContainerInfo"), {
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
};

// 删除单证记录
export const deleteDocumentCheck = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("deleteDocumentCheck"), {
    data
  });
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

// 删除箱子
export const deleteContainer = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("deleteContainer"), {
    data
  });
};

// 挑箱
export const pickBox = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("pickBox"), {
    data
  });
};

// 暂落
export const tempDrop = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("tempDrop"), {
    data
  });
};

// 批量设置提箱点
export const loadPort = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("loadPort"), {
    data
  });
};

// 修改船期
export const arriveTime = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("arriveTime"), {
    data
  });
};

// 批量设置箱信息
export const settingContainer = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("settingContainer"), {
    data
  });
};
