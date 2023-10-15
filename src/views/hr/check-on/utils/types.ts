// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  name: string;
  check_on_date: string;
  check_on_time: string;
  check_on_address: string;
  check_on_type: string;
  check_on_remark: string;
  check_out_time: string;
  check_out_address: string;
  check_out_type: string;
  check_out_remark: string;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
