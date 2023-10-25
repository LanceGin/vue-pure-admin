// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  riqi: string;
  siji: string;
  suoshugongsi: string;
  chetouhao: string;
  cheguahao: string;
  cheliangfeiyong: string;
  zhuangtaineirong: string;
  shuliang: string;
  jine: string;
  fentanyuefen: string;
  shijijine: string;
  jiesuanqueren: string;
  fujian: string;
  beizhu: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
