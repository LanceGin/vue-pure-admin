// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  status: string;
  yewu: string;
  name: string;
  zhifu: string;
  zhifu_type: string;
  amount: string;
  submit: string;
  tax: string;
  apply_staff: string;
  add_time: string;
  submit_staff: string;
  shenhe: string;
  shenpi: string;
  jizhang: string;
  feiyongbianhao: string;
  jizhang_time: string;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
