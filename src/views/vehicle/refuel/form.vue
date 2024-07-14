<script setup lang="ts">
import { reactive, ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { vehicleInfoList } from "@/api/vehicle";
import type { PaginationProps } from "@pureadmin/table";
import { useUserStore } from "@/store/modules/user";

const user = useUserStore();
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    car_no: "",
    driver: "",
    addtime: "",
    volume: "",
    unit_price: "",
    type: "",
    amount: "",
    remark: ""
  })
});

/** 分页配置 */
const pagination = reactive<PaginationProps>({
  pageSize: 500,
  currentPage: 1,
  total: 0
});
const form = reactive({
  id: "",
  car_no: "",
  driver: "",
  territory: "",
  mobile: "",
  add_by: user.username
});

interface CompanyItem {
  id: string;
  car_no: string;
  car: string;
}
const loading = ref(false);
const list = ref<CompanyItem[]>([]);
const options = ref<CompanyItem[]>([]);
let accData = [];
const data = vehicleInfoList({ pagination, form });
data.then(v => {
  accData = v.data.list;
  list.value = accData.map(item => {
    return {
      id: `${item.id}`,
      car_no: `${item.car_no}-${item.driver}`,
      car: `${item.car_no}-${item.driver}-${item.territory}`
    };
  });
});

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = list.value.filter(item => {
        return item.car_no.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options.value = [];
  }
};

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

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
  >
    <el-form-item label="车号" prop="car_no">
      <el-select
        v-model="newFormInline.car_no"
        filterable
        remote
        reserve-keyword
        placeholder="输入车号关键字"
        :remote-method="remoteMethod"
        :loading="loading"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.car"
          :value="item.car_no"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="日期" prop="addtime">
      <el-date-picker
        v-model="newFormInline.addtime"
        type="date"
        placeholder="请输入日期"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>

    <el-form-item label="升数" prop="volume">
      <el-input
        v-model="newFormInline.volume"
        clearable
        placeholder="请输入升数"
      />
    </el-form-item>

    <el-form-item label="单价" prop="unit_price">
      <el-input
        v-model="newFormInline.unit_price"
        clearable
        placeholder="请输入单价"
      />
    </el-form-item>

    <el-form-item label="类型" prop="type">
      <el-select
        v-model="newFormInline.type"
        placeholder="请选择类型"
        clearable
        class="!w-[180px]"
      >
        <el-option label="分配" value="分配" />
        <el-option label="买入" value="买入" />
        <el-option label="注销" value="注销" />
      </el-select>
    </el-form-item>

    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
  </el-form>
</template>
