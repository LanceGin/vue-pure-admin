// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: any;
  /** 用户全称 */
  companyName: string;
  // 用户简称
  companyShortName: string;
  // 企业地址
  companyAddress: string;
  // 联系人
  companyContact: string;
  // 联系人电话
  companyPhone1: string;
  // 状态：
  state: string;
  // 项目管理
  project: string;
  // 门点
  mendian: string;
  // 子项目
  zixiangmu: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
