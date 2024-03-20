// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  status: string;
  type: string;
  account_period: string;
  fee_name: string;
  amount: string;
  less_amount: string;
  more_amount: string;
  fee_type: string;
  remark: string;
  order_status: string;
  order_type: string;
  ship_company: string;
  customer: string;
  subproject: string;
  arrive_time: string;
  start_port: string;
  target_port: string;
  containner_no: string;
  seal_no: string;
  container_type: string;
  container_fee: string;
  ship_name: string;
  track_no: string;
  unload_port: string;
  door: string;
  make_time: string;
  load_port: string;
  count: string;
  transfer_port: string;
  package_count: string;
  gross_weight: string;
  volume: string;
  container_weight: string;
  container_status: string;
  order_time: string;
  order_fee: string;
  car_no: string;
  add_by: string;
  add_time: string;
  project_name: string;
  custom_name: string;
  flow_direction: string;
  acc_company: string;
  content: string;
  invoice_no: string;
  car_owner: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
