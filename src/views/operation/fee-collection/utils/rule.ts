import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  shipCompany: [
    { required: true, message: "船公司名为必填项", trigger: "blur" }
  ],
  fleet_customer_id: [
    { required: true, message: "客户名为必填项", trigger: "blur" }
  ],
  fleetCompanyId: [
    { required: true, message: "车队公司名为必填项", trigger: "blur" }
  ],
  costName: [{ required: true, message: "费用名为必填项", trigger: "blur" }],
  project: [{ required: true, message: "项目名为必填项", trigger: "blur" }]
});
