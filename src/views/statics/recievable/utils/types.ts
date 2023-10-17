// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  zhuangtai: string;
  zhangqi: string;
  feiyongmc: string;
  jine: string;
  zuoxiangshijian: string;
  kehu: string;
  qishigang: string;
  mudigang: string;
  matou: string;
  chuangongsi: string;
  chuanming: string;
  xiangfenghao: string;
  xianghao: string;
  yundanhao: string;
  xiangxing: string;
  danjuleibie: string;
  mendian: string;
  yewu: string;
  wanglaidanwei: string;
  cheliang: string;
  beizhu: string;
  fapiaohao: string;
  chedui: string;
  jiesuanhao: string;
  jihuahao: string;
  lururen: string;
  lurushijian: string;
  feiyongleixing: string;
  huidanbeizhu: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
