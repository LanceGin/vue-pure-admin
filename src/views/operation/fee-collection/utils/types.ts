// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: any;
  old_id: string;
  shipCompany: string;
  fleet_customer_id: string;
  fleetCompanyId: string;
  project: string;
  costType: string;
  isStart: string;
  costName: string;
  costCode: string;
  accountCompanyType: string;
  price_gp20: string;
  price_tk20: string;
  price_gp40: string;
  price_tk40: string;
  price_hc40: string;
  price_ot40: string;
  price_ot20: string;
  price_fr40: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
