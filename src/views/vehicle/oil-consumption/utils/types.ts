// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  car_no: string;
  month: string;
  mileage: string;
  oil_standard: string;
  mileage_fix: string;
  volume: string;
  actual_volume: string;
  total_amount: string;
  delta_volume: string;
  reward_amount: string;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
