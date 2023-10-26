// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  kehu: string;
  yundanhao: string;
  xiangxing: string;
  zuoxiangshijian: string;
  fenghao: string;
  tixiangdian: string;
  zanluodian: string;
  chuanming: string;
  kaichuanshijian: string;
  liuxiang: string;
  xianghao: string;
  chehao: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
