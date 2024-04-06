<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../components/RePureTableBar";
import { useRenderIcon } from "../../../components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "CheckPoint"
});

const formRef = ref();
const {
  form,
  loading,
  haveRow,
  columns,
  dataList,
  pagination,
  // buttonClass,
  onSearch,
  openDialog,
  handleDelete,
  // handleDatabase,
  handleRowDblclick,
  handleEdit,
  handleSizeChange,
  handlePageChange,
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
      <el-form-item label="办公地名：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入办公地名"
          clearable
          class="!w-[180px]"
        />
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
          @click="onSearch()"
        >
          搜索
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog('新增')"
        >
          添加打卡点
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(EditPen)"
          @click="handleEdit()"
          :disabled="haveRow"
        >
          修改
        </el-button>
        <el-button
          type="danger"
          :icon="useRenderIcon(Delete)"
          @click="handleDelete()"
          :disabled="haveRow"
        >
          删除
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="打卡点列表" :columns="columns" @refresh="onSearch">
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
          highlight-current-row
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
          @row-dblclick="handleRowDblclick"
          @page-size-change="handleSizeChange"
          @page-current-change="handlePageChange"
          @current-change="handleCurrentChange"
        />
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
