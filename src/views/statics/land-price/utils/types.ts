// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  customer: string;
  fleet: string;
  load_address: string;
  unload_address: string;
  pay_price: string;
  collect_price: string;
  add_by: string;
  city: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
