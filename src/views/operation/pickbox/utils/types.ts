// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  kehu: string;
  xiangmu: string;
  yundanhao: string;
  xiangxing: string;
  xianghao: string;
  fenghao: string;
  jihuashijian: string;
  chuanming: string;
  chuanqi: string;
  duicuntianshu: string;
  chuangongsi: string;
  liuxiang: string;
  mendian: string;
  tixiangdian: string;
  huanxiangdian: string;
  zanluoriqi: string;
  zhuangtai: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
