import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  companyName: [
    { required: true, message: "客户全称为必填项", trigger: "blur" }
  ],
  companyShortName: [
    { required: true, message: "客户简称为必填项", trigger: "blur" }
  ],
  companyContact: [
    { required: true, message: "联系人为必填项", trigger: "blur" }
  ],
  companyPhone1: [
    { required: true, message: "联系电话为必填项", trigger: "blur" }
  ],
  companyAddress: [
    { required: true, message: "角色标识为必填项", trigger: "blur" }
  ],
  state: [{ required: true, message: "客户状态为必填项", trigger: "blur" }]
});
