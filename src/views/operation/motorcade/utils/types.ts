// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  /** 用户全称 */
  name: string;
  // 用户简称
  refer: string;
  // 企业地址
  address: string;
  // 联系人
  contact_name: string;
  // 联系人电话
  contact_mobile: string;
  // 状态：
  status: string;
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
