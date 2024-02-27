// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: any;
  is_dock: string;
  yard_name: string;
  port_name: string;
  yard_adress: string;
  contacts_name: string;
  mobile: string;
  remarks: string;
  longitude: string;
  latitude: string;
  base_price_20: string;
  base_price_40: string;
  price_rule: string;
  create_time: any;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
