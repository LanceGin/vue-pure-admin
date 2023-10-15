import { FormProps } from "./utils/types";

export const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    type: "",
    name: "",
    address: "",
    contact_name: "",
    contact_mobile: ""
  })
});
