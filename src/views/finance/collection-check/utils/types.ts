// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  type: string;
  status: string;
  account_period: string;
  custom_name: string;
  project_name: string;
  flow_direction: string;
  content: string;
  amount: string;
  total: string;
  f: string;
  t: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
