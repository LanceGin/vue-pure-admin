// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  // 状态
  status: string;
  // 客户
  custom: string;
  // 项目
  project: string;
  // 门点
  door: string;
  // 码头
  wharf: string;
  // 装箱
  i20gp: string;
  i40gp: string;
  i40tk: string;
  i40hc: string;
  // 拆箱
  o40tk: string;
  o40hc: string;
  o20tk: string;
  o40ot: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
