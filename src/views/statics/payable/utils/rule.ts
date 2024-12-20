import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  account_period: [
    { required: true, message: "账期为必填项", trigger: "blur" }
  ],
  is_pay: [{ required: true, message: "支付类型为必填项", trigger: "blur" }],
  custom_name: [
    { required: true, message: "供应商称为必填项", trigger: "blur" }
  ],
  apply_department: [
    { required: true, message: "申请单位为必填项", trigger: "blur" }
  ],
  acc_company: [
    { required: true, message: "结算单位为必填项", trigger: "blur" }
  ],
  flow_direction: [
    { required: true, message: "流向为必填项", trigger: "blur" }
  ],
  content: [{ required: true, message: "服务内容为必填项", trigger: "blur" }]
});
