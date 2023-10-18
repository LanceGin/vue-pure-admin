// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  bianhao: string;
  qiandingriqi: string;
  mingcheng: string;
  leixing: string;
  xiangmu: string;
  wofangdanwei: string;
  duifangdanwei: string;
  wofangjingban: string;
  duifangjingban: string;
  wofanglianxi: string;
  duifanglianxi: string;
  shengxiaoriqi: string;
  zhongzhiriqi: string;
  zongjiakuan: string;
  yizhifu: string;
  yukuan: string;
  fenshu: string;
  qianyuebumen: string;
  hetongzhuangtai: string;
  beizhu: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
