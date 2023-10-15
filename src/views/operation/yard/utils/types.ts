// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  // 堆场类型
  cata: string;
  /** 堆场名称 */
  name: string;
  // 所属码头
  refer: string;
  // 堆场地址
  address: string;
  // 联系人
  contact_name: string;
  // 联系人电话
  contact_mobile: string;
  // 车队公司
  company: string;
  // 备注
  remark: string;
  // 经度
  longitude: string;
  // 纬度
  latitude: string;
  // 进场价格
  price_20: string;
  price_40: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
