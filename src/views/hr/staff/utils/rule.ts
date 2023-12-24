import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "用户名为必填项", trigger: "blur" }],
  realname: [{ required: true, message: "真实姓名为必填项", trigger: "blur" }],
  mobile: [{ required: true, message: "手机号为必填项", trigger: "blur" }],
  mima: [{ required: true, message: "密码为必填项", trigger: "blur" }]
});
