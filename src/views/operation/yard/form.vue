<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    cata: "",
    name: "",
    address: "",
    refer: "",
    contact_name: "",
    contact_mobile: "",
    company: "",
    remark: "",
    longitude: "",
    latitude: "",
    price_20: "",
    price_40: ""
  })
});

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
    <el-form-item label="类型" prop="cata">
      <el-input
        v-model="newFormInline.refer"
        clearable
        placeholder="请输入堆场类型"
      />
    </el-form-item>

    <el-form-item label="堆场名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入堆场名称"
      />
    </el-form-item>

    <el-form-item label="堆场地址" prop="address">
      <el-input
        v-model="newFormInline.address"
        clearable
        placeholder="请输入堆场地址"
      />
    </el-form-item>

    <el-form-item label="所属港口" prop="refer">
      <el-input
        v-model="newFormInline.refer"
        clearable
        placeholder="请输入所属港口"
      />
    </el-form-item>

    <el-form-item label="联系人" prop="contact_name">
      <el-input
        v-model="newFormInline.contact_name"
        clearable
        placeholder="请输入联系人"
      />
    </el-form-item>

    <el-form-item label="联系电话" prop="contact_mobile">
      <el-input
        v-model="newFormInline.contact_mobile"
        clearable
        placeholder="请输入联系电话"
      />
    </el-form-item>

    <el-form-item label="车队公司" prop="company">
      <el-input
        v-model="newFormInline.company"
        clearable
        placeholder="请输入车队公司"
      />
    </el-form-item>

    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
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

    <el-form-item label="进场价格20" prop="price_20">
      <el-input
        v-model="newFormInline.price_20"
        clearable
        placeholder="请输入进场价格20"
      />
    </el-form-item>

    <el-form-item label="进场价格40" prop="price_40">
      <el-input
        v-model="newFormInline.price_40"
        clearable
        placeholder="请输入进场价格40"
      />
    </el-form-item>
  </el-form>
</template>
