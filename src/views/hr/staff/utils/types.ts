// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  name: string;
  realname: string;
  mobile: string;
  email: string;
  department: string;
  group: string;
  wechat: string;
  create_time: string;
  create_staff: string;
  mima: string;
  shenfenzheng: string;
  zhuzhi: string;
  ruzhishijian: string;
  zhuangtai: string;
  check_point: string;
  work_hours: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
