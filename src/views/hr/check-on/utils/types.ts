// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  userName: string;
  clock_date: string;
  clockin_time: string;
  clockin_location: string;
  clockin_type: string;
  clockin_remark: string;
  clockout_time: string;
  clockout_location: string;
  clockout_type: string;
  clockout_remark: string;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
