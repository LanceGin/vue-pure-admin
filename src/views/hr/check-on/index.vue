<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../components/RePureTableBar";
import { useRenderIcon } from "../../../components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
// import Delete from "@iconify-icons/ep/delete";
// import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";
// import Download from "@iconify-icons/ep/download";
// import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "Role"
});

const formRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  // buttonClass,
  exportExcel,
  onSearch,
  // resetForm,
  openDialog,
  // handleDelete,
  // handleDatabase,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange
} = useRole();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="考勤时间：" prop="clock_date">
        <el-date-picker
          v-model="form.clock_date"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="员工姓名：" prop="userName">
        <el-input
          v-model="form.userName"
          placeholder="请输入姓名"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="签到类型：" prop="clockin_type">
        <el-select
          v-model="form.clockin_type"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="正常" value="0" />
          <el-option label="迟到" value="1" />
          <el-option label="外勤" value="2" />
          <el-option label="迟到+外勤" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="签退类型：" prop="clockout_type">
        <el-select
          v-model="form.clockout_type"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="正常" value="0" />
          <el-option label="早退" value="1" />
          <el-option label="外勤" value="2" />
          <el-option label="早退+外勤" value="3" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出
        </el-button>
        <!-- <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
        >
          考勤统计
        </el-button> -->
      </el-form-item>
    </el-form>

    <PureTableBar title="打卡记录" :columns="columns" @refresh="onSearch">
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #clockin="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="openDialog('地图', row)"
            >
              {{ row.clockin_location }}
            </el-button>
          </template>
          <template #clockout="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="openDialog('地图', row)"
            >
              {{ row.clockout_location }}
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
