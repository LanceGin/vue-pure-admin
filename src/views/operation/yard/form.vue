<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import type { TabsPaneContext } from "element-plus";
import { getYardPriceList } from "@/api/operation";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    is_dock: "",
    yard_name: "",
    port_name: "",
    yard_adress: "",
    contacts_name: "",
    mobile: "",
    remarks: "",
    longitude: "",
    latitude: "",
    base_price_20: "",
    base_price_40: "",
    create_time: ""
  })
});

const columns: TableColumnList = [
  {
    label: "Min",
    prop: "day_min"
  },
  {
    label: "Max",
    prop: "day_max"
  },
  {
    label: "20",
    prop: "price_20"
  },
  {
    label: "40",
    prop: "price_40"
  }
];

const tableData = ref([]);
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const activeName = ref("first");
const data = getYardPriceList(newFormInline.value);
data.then(v => {
  tableData.value = v.data.list;
});

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
    :inline="true"
  >
    <el-form-item label="类型" prop="is_dock">
      <el-select
        v-model="newFormInline.is_dock"
        placeholder="请选择堆场类型"
        clearable
      >
        <el-option label="堆场" value="0" />
        <el-option label="码头" value="1" />
      </el-select>
    </el-form-item>

    <el-form-item label="堆场名称" prop="yard_name">
      <el-input
        v-model="newFormInline.yard_name"
        clearable
        placeholder="请输入堆场名称"
      />
    </el-form-item>

    <el-form-item label="堆场地址" prop="yard_adress">
      <el-input
        v-model="newFormInline.yard_adress"
        clearable
        placeholder="请输入堆场地址"
      />
    </el-form-item>

    <el-form-item label="所属港口" prop="port_name">
      <el-input
        v-model="newFormInline.port_name"
        clearable
        placeholder="请输入所属港口"
      />
    </el-form-item>

    <el-form-item label="联系人" prop="contacts_name">
      <el-input
        v-model="newFormInline.contacts_name"
        clearable
        placeholder="请输入联系人"
      />
    </el-form-item>

    <el-form-item label="联系电话" prop="mobile">
      <el-input
        v-model="newFormInline.mobile"
        clearable
        placeholder="请输入联系电话"
      />
    </el-form-item>

    <el-form-item label="备注" prop="remarks">
      <el-input
        v-model="newFormInline.remarks"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>

    <el-form-item label="经度" prop="longitude">
      <el-input
        v-model="newFormInline.longitude"
        clearable
        placeholder="请输入经度"
      />
    </el-form-item>

    <el-form-item label="纬度" prop="latitude">
      <el-input
        v-model="newFormInline.latitude"
        clearable
        placeholder="请输入纬度"
      />
    </el-form-item>

    <el-form-item label="进场价20" prop="base_price_20">
      <el-input
        v-model="newFormInline.base_price_20"
        clearable
        placeholder="请输入进场价格20"
      />
    </el-form-item>

    <el-form-item label="进场价40" prop="base_price_40">
      <el-input
        v-model="newFormInline.base_price_40"
        clearable
        placeholder="请输入进场价格40"
      />
    </el-form-item>

    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="堆存天数对应金额" name="first">
        <pure-table :data="tableData" :columns="columns" />
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>
