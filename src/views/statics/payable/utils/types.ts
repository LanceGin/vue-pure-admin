// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  zhuangtai: string;
  zhangqi: string;
  gongyingshang: string;
  jiesuandanwei: string;
  kaihuhang: string;
  yinhangzhanghao: string;
  fuwu: string;
  f: string;
  t: string;
  xiangliang: string;
  jiesuanjine: string;
  kouchu: string;
  zengjia: string;
  shifu: string;
  haoma: string;
  jizhangriqi: string;
  beizhu: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
