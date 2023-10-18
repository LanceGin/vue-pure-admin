// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  zhuangtai: string;
  xingzhengyewu: string;
  feiyongming: string;
  shoufu: string;
  zhifuleixing: string;
  shenqingjine: string;
  baoxiaojine: string;
  shuie: string;
  shenqingren: string;
  shenqingdanwei: string;
  lurushijian: string;
  baoxiaoren: string;
  shenheren: string;
  shenheshijian: string;
  shenpiren: string;
  feiyongbianhao: string;
  shenqingbianhao: string;
  beizhu: string;
  shenqingriqi: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
