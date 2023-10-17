// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  xuhao: string;
  daima: string;
  haoma: string;
  shudianpiao: string;
  xiaofangsbh: string;
  xiaofangmc: string;
  goufangsbh: string;
  goufangmc: string;
  kaipiaoriqi: string;
  fenleibianma: string;
  huowu: string;
  guige: string;
  danwei: string;
  shuliang: string;
  danjia: string;
  jine: string;
  shuilv: string;
  shuie: string;
  laiyuan: string;
  piaozhong: string;
  zhuangtai: string;
  fengxiandengji: string;
  kaipiaoren: string;
  beizhu: string;
  shifoushoupiao: string;
  fukuanriqi: string;
  renzhengqi: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
