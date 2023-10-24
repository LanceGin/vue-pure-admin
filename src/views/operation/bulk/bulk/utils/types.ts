// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  riqi: string;
  leixing: string;
  kehu: string;
  chengyunchedui: string;
  zhuanghuo: string;
  xiehuo: string;
  chexing: string;
  chehao: string;
  shoujihao: string;
  yunfei: string;
  beizhu: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
