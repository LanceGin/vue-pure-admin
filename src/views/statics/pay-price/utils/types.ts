// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: any;
  is_pay: string;
  status: string;
  customer: string;
  project: string;
  door: string;
  port: string;
  i20gp: string;
  i40gp: string;
  i20tk: string;
  i40hc: string;
  o20gp: string;
  o40gp: string;
  o20tk: string;
  o40hc: string;
  add_time: any;
  add_by: string;
  city: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
