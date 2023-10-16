import { FormProps } from "./utils/types";

export const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    status: "",
    custom: "",
    project: "",
    door: "",
    wharf: "",
    i20gp: "",
    i40gp: "",
    i40tk: "",
    i40hc: "",
    o40tk: "",
    o40hc: "",
    o20tk: "",
    o40ot: ""
  })
});
