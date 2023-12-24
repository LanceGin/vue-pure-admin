// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  car_no: string;
  mileage_6m: string;
  oil_standard: string;
  mileage_fix: string;
  volume: string;
  unit_price: string;
  amount: string;
  actual_volume: string;
  total_amount: string;
  delta_volume: string;
  reward_amount: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
