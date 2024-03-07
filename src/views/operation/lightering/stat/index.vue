<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../../components/RePureTableBar";
import { useRenderIcon } from "../../../../components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";

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
  handleDelete,
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
      <el-form-item label="日期：" prop="add_time_range">
        <el-date-picker
          v-model="form.add_time_range"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD"
          value-format="YYYY/MM/DD"
        />
      </el-form-item>
      <el-form-item label="货物名：" prop="cargo_name">
        <el-input
          v-model="form.cargo_name"
          placeholder="请输入货物名"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="类型：" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="阳逻-金口" value="0" />
          <el-option label="金口-阳逻" value="1" />
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
      </el-form-item>
    </el-form>

    <PureTableBar title="驳运统计" :columns="columns" @refresh="onSearch">
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
          show-summary
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="openDialog('编辑', row)"
            >
              修改
            </el-button>
            <el-popconfirm
              :title="`是否确认删除堆场名称为${row.name}的这条数据`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(Delete)"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
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
