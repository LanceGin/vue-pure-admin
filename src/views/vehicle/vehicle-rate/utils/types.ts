// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  car_no: string;
  company: string;
  inspect: string;
  rate: string;
  compulsory_insurance: string;
  commercial_insurance: string;
  trans_insurance: string;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
