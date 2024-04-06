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
import AddFill from "@iconify-icons/ri/add-circle-line";
import {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  genFileId,
  ElMessageBox
} from "element-plus";

defineOptions({
  name: "DriverInfo"
});

const formRef = ref();
const dialogVisible = ref(false);
const {
  form,
  loading,
  haveRow,
  columns,
  dataList,
  pagination,
  // buttonClass,
  exportExcel,
  onSearch,
  openDialog,
  handleDelete,
  // handleDatabase,
  uploadExcelDetail,
  handleRowDblclick,
  handleEdit,
  handleSizeChange,
  handlePageChange,
  handleCurrentChange,
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

const handleClose = () => {
  ElMessageBox.confirm("确定取消导入司机信息？")
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
      <el-form-item label="驾驶员：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入驾驶员姓名"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>

      <el-form-item label="手机号：" prop="mobile">
        <el-input
          v-model="form.mobile"
          placeholder="请输入手机号"
          clearable
          class="!w-[200px]"
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
          @click="openDialog('新增')"
        >
          添加驾驶员
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

    <el-dialog v-model="dialogVisible" title="导入司机信息" width="30%">
      <el-upload
        ref="upload"
        accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :limit="1"
        :on-exceed="handleExceed"
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

    <PureTableBar title="驾驶员列表" :columns="columns" @refresh="onSearch">
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
