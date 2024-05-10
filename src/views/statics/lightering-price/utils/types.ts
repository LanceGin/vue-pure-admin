// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  settlement: string;
  cargo_name: string;
  order_fee: string;
  p40: string;
  p20: string;
  c40: string;
  c20: string;
  add_by: string;
  city: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
