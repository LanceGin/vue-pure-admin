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
import Upload from "@iconify-icons/ep/upload";
import Download from "@iconify-icons/ep/download";
// import AddFill from "@iconify-icons/ri/add-circle-line";

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
  // openDialog,
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
      <el-form-item label="申请日期：" prop="add_time">
        <el-input
          v-model="form.add_time"
          placeholder="请输入申请日期"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="申请编号：" prop="feiyongbianhao">
        <el-input
          v-model="form.feiyongbianhao"
          placeholder="请输入申请编号"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="费用名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入费用名称"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="记账时间：" prop="jizhang_time">
        <el-input
          v-model="form.jizhang_time"
          placeholder="请输入记账时间"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="支付类型：" prop="zhifu_type">
        <el-select
          v-model="form.zhifu_type"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="0" />
          <el-option label="转账" value="1" />
          <el-option label="现金" value="2" />
          <el-option label="支票" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="0" />
          <el-option label="未提交" value="1" />
          <el-option label="已提交" value="2" />
          <el-option label="已撤销" value="3" />
          <el-option label="通过审核" value="4" />
          <el-option label="未通过审核" value="5" />
          <el-option label="通过审批" value="6" />
          <el-option label="已记账" value="7" />
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
        <el-button :icon="useRenderIcon(Download)" @click="resetForm(formRef)">
          导入
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="resetForm(formRef)">
          导出
        </el-button>
        <el-button
          class="reset-margin"
          type="success"
          :icon="useRenderIcon(EditPen)"
          :disabled="haveRow"
        >
          记账
        </el-button>
        <el-button
          class="reset-margin"
          type="danger"
          :icon="useRenderIcon(EditPen)"
          :disabled="haveRow"
        >
          撤销记账
        </el-button>
        <el-button
          class="reset-margin"
          type="danger"
          :icon="useRenderIcon(Delete)"
          :disabled="haveRow"
          @click="handleDelete()"
        >
          删除
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar
      title="费用记录（测试用，操作后不生效）"
      :columns="columns"
      @refresh="onSearch"
    >
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
