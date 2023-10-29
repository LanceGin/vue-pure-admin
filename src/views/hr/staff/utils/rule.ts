import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "用户名为必填项", trigger: "blur" }],
  realname: [{ required: true, message: "真实姓名为必填项", trigger: "blur" }],
  mobile: [{ required: true, message: "手机号为必填项", trigger: "blur" }],
  email: [{ required: true, message: "EMAIL为必填项", trigger: "blur" }],
  department: [{ required: true, message: "部门为必填项", trigger: "blur" }],
  mima: [{ required: true, message: "密码为必填项", trigger: "blur" }],
  shenfenzheng: [
    { required: true, message: "身份证号为必填项", trigger: "blur" }
  ],
  zhuzhi: [{ required: true, message: "家庭住址为必填项", trigger: "blur" }],
  ruzhishijian: [
    { required: true, message: "入职时间为必填项", trigger: "blur" }
  ]
});
