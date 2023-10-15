// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  status: string;
  cata: string;
  order_no: string;
  custom: string;
  project: string;
  tracking_no: string;
  box: string;
  boat: string;
  boat_company: string;
  commission_no: string;
  boat_date: string;
  fee_time: string;
  fee: string;
  fee_amount: string;
  add_time: string;
  add_stuff: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
