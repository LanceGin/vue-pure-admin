// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: string;
  code: string;
  no: string;
  digital_ticket_no: string;
  seller_identification_no: string;
  seller_name: string;
  buyer_identification_no: string;
  buyer_name: string;
  invoice_time: string;
  classification_code: string;
  specific_type: string;
  goods_or_taxable_service: string;
  specification: string;
  unit: string;
  quantity: string;
  unit_price: string;
  amount: string;
  tax_rate: string;
  tax: string;
  total_amount: string;
  invoice_from: string;
  invoice_type: string;
  status: string;
  is_positive: string;
  risk_level: string;
  invoice_by: string;
  remark: string;
  is_invoice: string;
  paid_time: string;
  certification_period: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
