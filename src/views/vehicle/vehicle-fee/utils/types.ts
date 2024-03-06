// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  is_submit: string;
  add_time: string;
  driver: string;
  company: string;
  car_no: string;
  hang_board_no: string;
  type: string;
  car_fees: string;
  content: string;
  quantity: string;
  amount: string;
  allocation_month: string;
  actual_amount: string;
  tax_amount: string;
  settlement_confirm: string;
  annex_url: string;
  remark: string;
  add_by: string;
  fee_name: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
