// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  riqi: string;
  chuanming: string;
  tidanhao: string;
  zhuanghuogang: string;
  xiehuogang: string;
  mudigang: string;
  xianghuozongzhong: string;
  xianghao: string;
  chixiangren: string;
  fujiacaozuo: string;
  chuangongsixiangxing: string;
  haiguanxiangxing: string;
  ISO: string;
  jinchukou: string;
  kongzhong: string;
  maoyileixing: string;
  qianfenghao: string;
  huoming: string;
  xiechuanfufeiren: string;
  zhongzhuanleixing: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
