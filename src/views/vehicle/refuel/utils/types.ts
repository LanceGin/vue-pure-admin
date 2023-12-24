// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  car_no: string;
  driver: string;
  addtime: string;
  volume: string;
  unit_price: string;
  type: string;
  amount: string;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
