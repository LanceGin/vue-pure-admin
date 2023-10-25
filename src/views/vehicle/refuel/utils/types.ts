// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  chehao: string;
  jiashiyuan: string;
  riqi: string;
  shengshu: string;
  danjia: string;
  leixing: string;
  jine: string;
  beizhu: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
