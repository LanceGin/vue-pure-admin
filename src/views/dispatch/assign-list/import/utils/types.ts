// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  kehu: string;
  yundanhao: string;
  xiangxing: string;
  zuoxiangshijian: string;
  mendian: string;
  huanxiangdian: string;
  chuanming: string;
  kaichuanshijian: string;
  liuxiang: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };