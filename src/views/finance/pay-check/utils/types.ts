// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  no: string;
  car_no: string;
  licheng_6: string;
  youhaobiaozhun: string;
  licheng_xiuzheng: string;
  hedingshengshu: string;
  danjia: string;
  jinfei: string;
  shijishengshu: string;
  amount: string;
  chashengshu: string;
  jiangfa: string;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
