import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "客户全称为必填项", trigger: "blur" }],
  refer: [{ required: true, message: "客户简称为必填项", trigger: "blur" }],
  contact_name: [
    { required: true, message: "联系人为必填项", trigger: "blur" }
  ],
  contact_mobile: [
    { required: true, message: "联系电话为必填项", trigger: "blur" }
  ],
  address: [{ required: true, message: "角色标识为必填项", trigger: "blur" }],
  city: [{ required: true, message: "地区为必选项", trigger: "blur" }]
});
