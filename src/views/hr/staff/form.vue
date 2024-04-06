<script setup lang="ts">
import { reactive, ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { clockPointList } from "@/api/user";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
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
    work_hours: ""
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
  name: "",
  address: "",
  location: ""
});

interface CompanyItem {
  id: string;
  name: string;
  address: string;
}
const loading = ref(false);
const list = ref<CompanyItem[]>([]);
const options = ref<CompanyItem[]>([]);
let accData = [];
const data = clockPointList({ pagination, form });
data.then(v => {
  accData = v.data.list;
  list.value = accData.map(item => {
    return {
      id: `${item.id}`,
      name: `${item.name}`,
      address: `${item.name}-${item.address}`
    };
  });
});

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = list.value.filter(item => {
        return item.name.toLowerCase().includes(query.toLowerCase());
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
    <el-form-item label="用户名" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入用户名"
      />
    </el-form-item>
    <el-form-item label="姓名" prop="realname">
      <el-input
        v-model="newFormInline.realname"
        clearable
        placeholder="请输入姓名"
      />
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input
        v-model="newFormInline.mobile"
        clearable
        placeholder="请输入手机号"
      />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="newFormInline.email"
        clearable
        placeholder="请输入邮箱"
      />
    </el-form-item>
    <el-form-item label="部门" prop="department">
      <el-input
        v-model="newFormInline.department"
        clearable
        placeholder="请输入部门"
      />
    </el-form-item>
    <el-form-item label="打卡点" prop="check_point">
      <el-select
        v-model="newFormInline.check_point"
        filterable
        remote
        reserve-keyword
        placeholder="输入打卡点关键字"
        :remote-method="remoteMethod"
        :loading="loading"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.address"
          :value="item.name"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="工作时间" prop="work_hours">
      <el-input
        v-model="newFormInline.work_hours"
        clearable
        placeholder="请输入工作时间"
      />
    </el-form-item>
    <el-form-item label="密码" prop="mima">
      <el-input
        v-model="newFormInline.mima"
        clearable
        type="password"
        show-password
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item label="身份证号" prop="shenfenzheng">
      <el-input
        v-model="newFormInline.shenfenzheng"
        clearable
        placeholder="请输入身份证号"
      />
    </el-form-item>
    <el-form-item label="家庭住址" prop="zhuzhi">
      <el-input
        v-model="newFormInline.zhuzhi"
        clearable
        placeholder="请输入家庭住址"
      />
    </el-form-item>
    <el-form-item label="入职时间" prop="ruzhishijian">
      <el-date-picker
        v-model="newFormInline.ruzhishijian"
        type="date"
        placeholder="请输入入职时间"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="在职状态" prop="zhuangtai">
      <el-select
        v-model="newFormInline.zhuangtai"
        placeholder="请选择在职状态"
        clearable
      >
        <el-option label="在职" value="0" />
        <el-option label="离职" value="1" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
