// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  xianghao: string;
  xiangxing: string;
  mendian: string;
  tixiangdian: string;
  zuoxiangshijian: string;
  zanluo: string;
  yundanhao: string;
  chuanming: string;
  daogangshijian: string;
  liuxiang: string;
  kehu: string;
  chehao: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
