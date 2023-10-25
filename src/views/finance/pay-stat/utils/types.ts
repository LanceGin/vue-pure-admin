// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  zhangqi: string;
  zuoxiangriqi: string;
  feiyongming: string;
  yingfudanwei: string;
  yewu: string;
  mendian: string;
  t: string;
  f: string;
  xiangliang: string;
  yingfu: string;
  shifu: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
