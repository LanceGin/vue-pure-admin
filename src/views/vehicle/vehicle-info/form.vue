<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    territory: "",
    brand: "",
    car_no: "",
    emission: "",
    life: "",
    axles: "",
    owner: "",
    attachment: "",
    oil_card_owner: "",
    hang_board_no: "",
    driver: "",
    mobile: "",
    attribute: "",
    remark: ""
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
    <el-form-item label="所属地" prop="territory">
      <el-input
        v-model="newFormInline.territory"
        clearable
        placeholder="请输入所属地"
      />
    </el-form-item>
    <el-form-item label="品牌" prop="brand">
      <el-input
        v-model="newFormInline.brand"
        clearable
        placeholder="请输入品牌"
      />
    </el-form-item>
    <el-form-item label="车牌号" prop="car_no">
      <el-input
        v-model="newFormInline.car_no"
        clearable
        placeholder="请输入车牌号"
      />
    </el-form-item>
    <el-form-item label="排放" prop="emission">
      <el-input
        v-model="newFormInline.emission"
        clearable
        placeholder="请输入排放"
      />
    </el-form-item>
    <el-form-item label="车辆购买年限" prop="life">
      <el-input
        v-model="newFormInline.life"
        clearable
        placeholder="请输入车辆购买年限"
      />
    </el-form-item>
    <el-form-item label="轴数" prop="axles">
      <el-input
        v-model="newFormInline.axles"
        clearable
        placeholder="请输入轴数"
      />
    </el-form-item>
    <el-form-item label="车辆所属" prop="owner">
      <el-input
        v-model="newFormInline.owner"
        clearable
        placeholder="请输入车辆所属"
      />
    </el-form-item>
    <el-form-item label="车辆挂靠" prop="attachment">
      <el-input
        v-model="newFormInline.attachment"
        clearable
        placeholder="请输入车辆挂靠"
      />
    </el-form-item>
    <el-form-item label="油卡归属" prop="oil_card_owner">
      <el-input
        v-model="newFormInline.oil_card_owner"
        clearable
        placeholder="请输入油卡归属"
      />
    </el-form-item>
    <el-form-item label="挂板号" prop="hang_board_no">
      <el-input
        v-model="newFormInline.hang_board_no"
        clearable
        placeholder="请输入挂板号"
      />
    </el-form-item>
    <el-form-item label="驾驶员" prop="driver">
      <el-input
        v-model="newFormInline.driver"
        clearable
        placeholder="请输入驾驶员"
      />
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input
        v-model="newFormInline.mobile"
        clearable
        placeholder="请输入手机号"
      />
    </el-form-item>
    <el-form-item label="属性" prop="attribute">
      <el-input
        v-model="newFormInline.attribute"
        clearable
        placeholder="请输入属性"
      />
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
