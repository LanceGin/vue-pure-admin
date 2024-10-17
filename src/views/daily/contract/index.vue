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
  UploadProps,
  UploadRawFile,
  genFileId,
  ElMessage,
  UploadInstance,
  ElMessageBox
} from "element-plus";

defineOptions({
  name: "Contract"
});

const formRef = ref();
const upload = ref<UploadInstance>();
const dialogVisible = ref(false);
const {
  form,
  loading,
  haveRow,
  columns,
  dataList,
  tableRowClassName,
  pagination,
  // buttonClass,
  exportExcel,
  onSearch,
  resetForm,
  openDialog,
  handleDelete,
  // handleDatabase,
  handleRowDblclick,
  handleEdit,
  handleSizeChange,
  handlePageChange,
  handleCurrentChange,
  handleSelectionChange,
  handleUploadContract,
  handleDownloadContract
} = useRole();

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
    message: "上传成功"
  });
  onSearch();
};

const handleClose = () => {
  ElMessageBox.confirm("确定取消上传？")
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
      <el-form-item label="签订日期" prop="sign_time">
        <el-date-picker
          v-model="form.sign_time"
          type="date"
          placeholder="请输入签订日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="终止日期" prop="end_time">
        <el-date-picker
          v-model="form.end_time"
          type="date"
          placeholder="请输入终止日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="合同编号：" prop="contract_no">
        <el-input
          v-model="form.contract_no"
          placeholder="请输入合同编号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="总价款：" prop="total_amount">
        <el-input
          v-model="form.total_amount"
          placeholder="请输入总价款"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="合同类型：" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="劳动合同" value="劳动合同" />
          <el-option label="驾驶员合同" value="驾驶员合同" />
          <el-option label="货物运输合同" value="货物运输合同" />
          <el-option label="物流运输" value="物流运输" />
          <el-option label="挂靠协议" value="挂靠协议" />
          <el-option label="购买车辆" value="购买车辆" />
          <el-option label="车辆租赁" value="车辆租赁" />
          <el-option label="承包运营" value="承包运营" />
          <el-option label="商业保险" value="商业保险" />
          <el-option label="行政" value="行政" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="履行情况：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择履行情况"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="履行中" value="履行中" />
          <el-option label="到期终止" value="到期终止" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="正常" value="正常" />
          <el-option label="异常-变更" value="异常-变更" />
          <el-option label="异常-解除" value="异常-解除" />
          <el-option label="异常-违约" value="异常-违约" />
        </el-select>
      </el-form-item>
      <el-form-item label="我方单位：" prop="we_company">
        <el-input
          v-model="form.we_company"
          placeholder="请输入我方单位"
          clearable
        />
      </el-form-item>
      <el-form-item label="对方企业或个人：" prop="oppo_company">
        <el-input
          v-model="form.oppo_company"
          placeholder="请输入对方企业或个人"
          clearable
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
          添加合同
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出合同列表
        </el-button>
        <!-- <el-button :icon="useRenderIcon(EditPen)" @click="resetForm(formRef)">
          调整已支付金额
        </el-button> -->
        <el-button
          :disabled="haveRow"
          :icon="useRenderIcon(Upload)"
          @click="dialogVisible = true"
        >
          上传合同
        </el-button>
        <!-- <el-button :icon="useRenderIcon(Download)" @click="resetForm(formRef)">
          下载合同
        </el-button> -->
        <el-button :icon="useRenderIcon(Download)" @click="resetForm(formRef)">
          合同模板
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

    <el-dialog v-model="dialogVisible" title="上传合同" width="30%">
      <el-upload
        ref="upload"
        drag
        accept="application/pdf"
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :auto-upload="false"
        :http-request="handleUploadContract"
      >
        <template #trigger>
          <el-button type="primary">选择或拖拽文件</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip text-red">可手动选择或拖拽合同上传</div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitUpload"> 上传 </el-button>
        </span>
      </template>
    </el-dialog>

    <PureTableBar title="合同管理" :columns="columns" @refresh="onSearch">
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
          :row-class-name="tableRowClassName"
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
        >
          <template #contract_url="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="handleDownloadContract(row)"
              v-if="row.contract_url != ''"
            >
              下载合同
            </el-button>
            <el-button
              class="reset-margin"
              link
              disabled
              type="default"
              :size="size"
              v-else
            >
              未上传
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

:deep(.pure-success-row) {
  --el-table-tr-bg-color: var(--el-color-danger-light-3);
}
</style>
