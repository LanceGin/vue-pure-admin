// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  area: string;
  brand: string;
  car_no: string;
  emission: string;
  buy_year: string;
  axles: string;
  company: string;
  guakao: string;
  youka: string;
  guaban_no: string;
  driver: string;
  mobile: string;
  meta: string;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
