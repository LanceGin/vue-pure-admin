<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import { ElMessage, ElMessageBox } from "element-plus";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";
import Download from "@iconify-icons/ep/download";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "DocumenCheck"
});

const formRef = ref();
const dialogVisible = ref(false);
const {
  form,
  loading,
  haveRow,
  containerVisible,
  columns,
  containerColumns,
  dataList,
  containerList,
  pagination,
  // buttonClass,
  exportExcel,
  onSearch,
  // resetForm,
  openDialog,
  handleDelete,
  // handleDatabase,
  uploadExcelDetail,
  handleSubmit,
  // handleEdit,
  handleRowDblclick,
  handleSizeChange,
  handlePageChange,
  // handleCurrentChange,
  handleSelectionChange
} = useRole();

const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = () => {
  upload.value!.submit();
  dialogVisible.value = false;
  onSearch();
};

const handleSuccess = () => {
  ElMessage({
    type: "success",
    message: "导入成功"
  });
  onSearch();
};

const handleClose = () => {
  ElMessageBox.confirm("确定取消导入单证列表？")
    .then(() => {
      // then
      dialogVisible.value = false;
    })
    .catch(() => {
      // catch error
    });
};
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="客户" prop="customer">
        <el-input
          v-model="form.customer"
          placeholder="请输入客户名称"
          clearable
          class="!w-[200px]"
          name="customer"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item label="子项目" prop="subproject">
        <el-input
          v-model="form.subproject"
          placeholder="请输入子项目名称"
          clearable
          class="!w-[200px]"
          name="subproject"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item label="单据类型" prop="order_type">
        <el-select
          v-model="form.order_type"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="进口" value="进口" />
          <el-option label="出口" value="出口" />
        </el-select>
      </el-form-item>

      <el-form-item label="打单日期" prop="order_time">
        <el-date-picker
          v-model="form.order_time"
          type="date"
          placeholder="请输入打单日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="运单号" prop="track_no">
        <el-input
          v-model="form.track_no"
          placeholder="请输入运单号"
          clearable
          class="!w-[200px]"
          name="track_no"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item label="状态" prop="order_status">
        <el-select
          v-model="form.order_status"
          placeholder="请选择状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="未审核" value="未审核" />
          <el-option label="已提交" value="已提交" />
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
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog('新增')"
        >
          单证录入
        </el-button>
        <el-button
          :icon="useRenderIcon(Download)"
          @click="dialogVisible = true"
        >
          导入
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(EditPen)"
          @click="handleSubmit()"
          :disabled="haveRow"
        >
          提交
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

    <el-dialog
      v-model="containerVisible"
      title="箱子列表"
      width="80%"
      custom-class="container-list"
    >
      <pure-table
        border
        align-whole="center"
        showOverflowTooltip
        highlight-current-row
        :data="containerList"
        :columns="containerColumns"
        :header-cell-style="{
          background: 'var(--el-table-row-hover-bg-color)',
          color: 'var(--el-text-color-primary)'
        }"
      />
    </el-dialog>

    <el-dialog v-model="dialogVisible" title="导入单证列表" width="30%">
      <el-upload
        ref="upload"
        accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :auto-upload="false"
        :http-request="uploadExcelDetail"
      >
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip text-red">
            仅限上传1份文件，多次上传覆盖之前文件
          </div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitUpload"> 上传 </el-button>
        </span>
      </template>
    </el-dialog>

    <PureTableBar title="单证管理" :columns="columns" @refresh="onSearch">
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
          show-summary
          @row-dblclick="handleRowDblclick"
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @page-current-change="handlePageChange"
        />
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
.container-list {
  height: 60%;
  overflow: scroll;
}

:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
