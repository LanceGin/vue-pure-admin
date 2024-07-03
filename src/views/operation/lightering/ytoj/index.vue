<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../../components/RePureTableBar";
import { useRenderIcon } from "../../../../components/ReIcon/src/hooks";

import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";
import Download from "@iconify-icons/ep/download";
import {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  genFileId,
  ElMessage,
  ElMessageBox
} from "element-plus";
// import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "Ytoj"
});

const formRef = ref();
const dialogVisible = ref(false);
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  // buttonClass,
  uploadExcelDetail,
  exportExcel,
  onSearch,
  // resetForm,
  // openDialog,
  // handleDelete,
  // handleDatabase,
  handleSizeChange,
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
      <el-form-item label="箱号：" prop="container_no">
        <el-input
          v-model="form.container_no"
          placeholder="多箱号换行输入"
          :autosize="{ minRows: 2, maxRows: 5 }"
          type="textarea"
          clearable
          class="!w-[200px]"
        />
        <el-button link type="primary" @click="form.container_no = ''"
          >清空</el-button
        >
      </el-form-item>
      <el-form-item label="船名航次：" prop="voyage">
        <el-input
          v-model="form.voyage"
          placeholder="请输入船名航次"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="货名：" prop="cargo_name">
        <el-input
          v-model="form.cargo_name"
          placeholder="请输入货名"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="日期：" prop="make_time_range">
        <el-date-picker
          v-model="form.make_time_range"
          type="daterange"
          start-placeholder="起始日期"
          end-placeholder="截止日期"
          format="YYYY-MM-DD"
          value-format="YYYY/MM/DD"
        />
      </el-form-item>
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
          :icon="useRenderIcon(Download)"
          @click="dialogVisible = true"
        >
          导入
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      v-model="dialogVisible"
      title="导入阳逻-金口驳运记录"
      width="30%"
    >
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

    <PureTableBar title="阳逻-金口" :columns="columns" @refresh="onSearch">
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
