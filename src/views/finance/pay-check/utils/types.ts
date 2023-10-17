// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  zhangqi: string;
  gongyingshang: string;
  jiesuandanwei: string;
  fuwu: string;
  f: string;
  t: string;
  xiangliang: string;
  jiesuan: string;
  kouchu: string;
  zengjia: string;
  shifu: string;
  beizhu: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
