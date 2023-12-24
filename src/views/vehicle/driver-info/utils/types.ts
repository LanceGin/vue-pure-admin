// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  name: string;
  id_no: string;
  mobile: string;
  attribute: string;
  settlement_company: string;
  remark: string;
  id_card_url: string;
  driver_license_url: string;
  certifiacation_url: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
