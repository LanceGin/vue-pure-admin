// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  car_no: string;
  company: string;
  year_deadline: string;
  rate_deadline: string;
  jiaoqiang: string;
  shangye: string;
  huowuyunshu: string;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
