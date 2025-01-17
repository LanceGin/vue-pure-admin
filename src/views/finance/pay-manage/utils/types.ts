// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  type: string;
  status: string;
  account_period: string;
  custom_name: string;
  apply_department: string;
  project_name: string;
  flow_direction: string;
  bank: string;
  account_no: string;
  content: string;
  amount: string;
  less_amount: string;
  more_amount: string;
  actual_amount: string;
  total: string;
  f: string;
  t: string;
  invoice_no: string;
  keep_time: string;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
