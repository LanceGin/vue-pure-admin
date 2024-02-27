// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  customer_id: string;
  customer: string;
  name: string;
  address: string;
  contact: string;
  phone: string;
  flag: string;
  project: string;
  new_name: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
