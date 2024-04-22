// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
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
  transport_status: string;
  temp_port: string;
  temp_status: string;
  temp_time: string;
  type: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
