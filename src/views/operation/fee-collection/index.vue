<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";
import Download from "@iconify-icons/ep/download";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "Role"
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
  resetForm,
  openDialog,
  handleDelete,
  // handleDatabase,
  handleRowDblclick,
  handleEdit,
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
      <el-form-item label="往来单位类型" prop="company_type">
        <el-select
          v-model="form.company_type"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="客户" value="0" />
          <el-option label="车队" value="1" />
          <el-option label="船东" value="2" />
          <el-option label="码头堆场" value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="费用名称：" prop="fee_name">
        <el-input
          v-model="form.fee_name"
          placeholder="请输入费用名称"
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
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
        >
          添加费用记录
        </el-button>
        <el-button :icon="useRenderIcon(Download)" @click="resetForm(formRef)">
          导入
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="resetForm(formRef)">
          导出
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

    <PureTableBar
      title="代收费用列表（测试用，操作后不生效）"
      :columns="columns"
      @refresh="onSearch"
    >
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
