// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  kehu: string;
  yewu: string;
  mendian: string;
  t: string;
  f: string;
  xiangliang: string;
  yingshou: string;
  jiesuan: string;
  kaipiao: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
