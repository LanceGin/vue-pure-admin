// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  riqi: string;
  leixing: string;
  kehu: string;
  chuangongsi: string;
  xianghao: string;
  xiangxing: string;
  fenghao: string;
  liuxiang: string;
  dizhi: string;
  chehao: string;
  yunfei: string;
  yichangfeiyong: string;
  beizhu: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
