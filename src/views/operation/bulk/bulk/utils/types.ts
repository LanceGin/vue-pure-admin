// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: any;
  type: string;
  customer: string;
  ship_company: string;
  fleet: string;
  load_area: string;
  unload_area: string;
  load_address: string;
  unload_address: string;
  bl_no: string;
  container_no: string;
  container_type: string;
  seal_no: string;
  flow_direction: string;
  voyage: string;
  address: string;
  car_type: string;
  car_no: string;
  driver_mobile: string;
  booking_fee: string;
  exchange_fee: string;
  freight: string;
  error_fee: string;
  remarks: string;
  add_time: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
