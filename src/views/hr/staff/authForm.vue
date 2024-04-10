<script setup lang="ts">
import { ref } from "vue";
import { FormProps } from "./utils/types";
import { Tree } from "element-plus/es/components/tree-v2/src/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    name: "",
    realname: "",
    mobile: "",
    email: "",
    department: "",
    group: "",
    wechat: "",
    create_time: "",
    create_staff: "",
    mima: "",
    shenfenzheng: "",
    zhuzhi: "",
    ruzhishijian: "",
    zhuangtai: "",
    check_point: "",
    work_hours: "",
    roles: "",
    city: ""
  })
});

const defaultProps = {
  children: "children",
  label: "label"
};

const data = [
  {
    role: "admin",
    label: "全权限",
    children: [
      {
        role: "operation",
        label: "运作管理",
        children: [
          {
            role: "ship_company",
            label: "船公司管理"
          },
          {
            role: "motorcade",
            label: "客户管理"
          },
          {
            role: "yard",
            label: "堆场管理"
          },
          {
            role: "bulk",
            label: "其他业务管理"
          },
          {
            role: "document_check",
            label: "单证管理"
          },
          {
            role: "container_done",
            label: "单据查看"
          },
          {
            role: "pick_box",
            label: "挑箱"
          },
          {
            role: "lightering",
            label: "驳运"
          }
        ]
      },
      {
        role: "dispatch",
        label: "调度管理",
        children: [
          {
            role: "unpacking",
            label: "拆箱暂落列表"
          },
          {
            role: "import",
            label: "进口派车单"
          },
          {
            role: "export",
            label: "出口派车单"
          },
          {
            role: "temp_drop",
            label: "暂落派车单"
          },
          {
            role: "wh_dispatch",
            label: "武汉派车单"
          },
          {
            role: "transport_manage",
            label: "运输节点服务"
          },
          {
            role: "path_track",
            label: "运输行程服务"
          }
        ]
      },
      {
        role: "vehicle",
        label: "车管工作",
        children: [
          {
            role: "vehicle_info",
            label: "车辆信息"
          },
          {
            role: "driver_info",
            label: "驾驶员信息"
          },
          {
            role: "vehicle_rate",
            label: "验车等评统计"
          },
          {
            role: "oil_consumption",
            label: "油耗核算"
          },
          {
            role: "refuel",
            label: "撬装加油"
          },
          {
            role: "vehicle_fee",
            label: "车辆费用"
          }
        ]
      },
      {
        role: "hr",
        label: "行政/人事",
        children: [
          {
            role: "check",
            label: "运作人员考核"
          },
          {
            role: "check_point",
            label: "打卡点管理"
          },
          {
            role: "staff",
            label: "员工管理"
          },
          {
            role: "btn_auth",
            label: "权限设置"
          },
          {
            role: "checkon",
            label: "考勤信息"
          }
        ]
      },
      {
        role: "statics",
        label: "统计管理",
        children: [
          {
            role: "lightering_price",
            label: "驳运价格"
          },
          {
            role: "collection_price",
            label: "门点价格（应收）"
          },
          {
            role: "pay_price",
            label: "门点价格（应付）"
          },
          {
            role: "recievable",
            label: "应收费用"
          },
          {
            role: "payable",
            label: "应付费用"
          },
          {
            role: "vehicle_fee_stat",
            label: "车辆费用统计"
          }
        ]
      },
      {
        role: "finance",
        label: "财务管理",
        children: [
          {
            role: "account_keep",
            label: "费用记账"
          },
          {
            role: "fee_name",
            label: "费用名维护"
          },
          {
            role: "collection_check",
            label: "应收审核"
          },
          {
            role: "pay_check",
            label: "应付审核"
          },
          {
            role: "collection_manage",
            label: "应收管理"
          },
          {
            role: "pay_manage",
            label: "应付管理"
          },
          {
            role: "collection_stat",
            label: "应收报表"
          },
          {
            role: "pay_stat",
            label: "应付报表"
          },
          {
            role: "invoice",
            label: "开票管理"
          },
          {
            role: "pay_invoice",
            label: "应付发票管理"
          },
          {
            role: "pay_invoice_orig",
            label: "原始发票管理"
          }
        ]
      },
      {
        role: "daily",
        label: "通用",
        children: [
          {
            role: "custom",
            label: "往来单位"
          },
          {
            role: "contract",
            label: "合同管理"
          }
        ]
      },
      {
        role: "manager",
        label: "总办"
      }
    ]
  }
];

const ruleFormRef = ref();
const auth = ref();
const newFormInline = ref(props.formInline);

const handleCheckChange = (
  data: Tree,
  checked: boolean,
  indeterminate: boolean
) => {
  console.log(data, checked, indeterminate);
  console.log(11111, auth.value.getCheckedKeys());
  newFormInline.value.roles = auth.value.getCheckedKeys().join(",");
};

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-tree
    style="max-width: 600px"
    :data="data"
    show-checkbox
    node-key="role"
    ref="auth"
    :default-checked-keys="newFormInline.roles.split(',')"
    :props="defaultProps"
    @check-change="handleCheckChange"
  />
</template>
