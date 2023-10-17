// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  zhuangtai: string;
  zhangqi: string;
  kehu: string;
  xiangmu: string;
  liuxiang: string;
  fuwu: string;
  f: string;
  t: string;
  xiangliang: string;
  yingshou: string;
  haoma: string;
  fapiaojine: string;
  shoukuan: string;
  weishoukuan: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
