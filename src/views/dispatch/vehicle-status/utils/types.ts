// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  territory: string;
  brand: string;
  car_no: string;
  emission: string;
  life: string;
  axles: string;
  owner: string;
  attachment: string;
  oil_card_owner: string;
  hang_board_no: string;
  driver: string;
  mobile: string;
  attribute: string;
  remark: string;
  status: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
