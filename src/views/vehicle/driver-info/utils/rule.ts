import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "司机名称为必填项", trigger: "blur" }],
  id_no: [{ required: true, message: "身份证号为必填项", trigger: "blur" }],
  mobile: [{ required: true, message: "手机号为必填项", trigger: "blur" }],
  settlement_company: [
    { required: true, message: "结算单位为必填项", trigger: "blur" }
  ]
});
