// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  type: string;
  add_time: string;
  voyage: string;
  voyage_string: string;
  container_no: string;
  customs_seal_no: string;
  seal_no: string;
  customs_container_type: string;
  iso: string;
  container_type: string;
  container_holder: string;
  is_import: string;
  extra_operation: string;
  trade_type: string;
  bl_no: string;
  cargo_type: string;
  cargo_name: string;
  load_port: string;
  target_port: string;
  unload_port: string;
  load_payer: string;
  unload_payer: string;
  total_weight: string;
  cargo_weight: string;
  empty_weight: string;
  volume: string;
  amount: string;
  cargo_owner: string;
  forwarder: string;
  transfer_type: string;
  remarks: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
