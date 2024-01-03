import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  account_period: [
    { required: true, message: "账期为必填项", trigger: "blur" }
  ],
  custom_name: [
    { required: true, message: "客户名称为必填项", trigger: "blur" }
  ],
  project_name: [
    { required: true, message: "项目名称为必填项", trigger: "blur" }
  ],
  flow_direction: [
    { required: true, message: "流向为必填项", trigger: "blur" }
  ],
  content: [{ required: true, message: "服务内容为必填项", trigger: "blur" }]
});
