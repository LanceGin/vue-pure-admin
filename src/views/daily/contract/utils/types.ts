// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  contract_no: string;
  sign_time: string;
  contract_name: string;
  type: string;
  content: string;
  we_company: string;
  oppo_company: string;
  we_agent: string;
  effective_time: string;
  end_time: string;
  total_amount: string;
  paid_amount: string;
  remain_amount: string;
  counts: string;
  department: string;
  status: string;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
