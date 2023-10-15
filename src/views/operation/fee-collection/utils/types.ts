// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  boat_company: string;
  car_company: string;
  name: string;
  project: string;
  fee_cata: string;
  cata: string;
  fee_name: string;
  fee_code: string;
  company_type: string;
  gp20: string;
  tk20: string;
  gp40: string;
  tk40: string;
  hc40: string;
  ot40: string;
  ot20: string;
  fr40: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
