// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  yucun: string;
  kahao: string;
  wanglaidanwei: string;
  fuwu: string;
  chongzhishijian: string;
  chongzhijine: string;
  xiaofeishijian: string;
  xiaofeijine: string;
  yue: string;
  caozuo: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
