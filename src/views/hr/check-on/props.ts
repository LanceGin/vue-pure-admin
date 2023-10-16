import { FormProps } from "./utils/types";

export const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    check_on_date: "",
    check_on_time: "",
    check_on_address: "",
    check_on_type: "",
    check_on_remark: "",
    check_out_time: "",
    check_out_address: "",
    check_out_type: "",
    check_out_remark: "",
    remark: ""
  })
});
