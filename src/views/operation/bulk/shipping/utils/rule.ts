import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  ship_company: [
    { required: true, message: "船公司为必填项", trigger: "blur" }
  ],
  container_no: [{ required: true, message: "箱号为必填项", trigger: "blur" }],
  bl_no: [{ required: true, message: "提单号为必填项", trigger: "blur" }],
  seal_no: [{ required: true, message: "封号为必填项", trigger: "blur" }]
});
