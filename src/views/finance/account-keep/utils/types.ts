// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  status: string;
  is_admin: string;
  fee_name: string;
  is_pay: string;
  pay_type: string;
  apply_amount: string;
  reimburse_amount: string;
  tax_amount: string;
  apply_by: string;
  apply_department: string;
  create_time: string;
  reimburse_by: string;
  audit_by: string;
  audit_time: string;
  approve_by: string;
  fee_no: string;
  remark: string;
  apply_time: string;
  keep_by: string;
  keep_time: string;
  reciept_url: Array<any>;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
