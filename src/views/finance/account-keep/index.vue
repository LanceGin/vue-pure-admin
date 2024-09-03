<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../components/RePureTableBar";
import { useRenderIcon } from "../../../components/ReIcon/src/hooks";

import { ElMessage, ElMessageBox } from "element-plus";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import type { PaginationProps } from "@pureadmin/table";
import { feeNameList } from "@/api/finance";
// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";
// import Download from "@iconify-icons/ep/download";
// import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "AccountKeep"
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
  // resetForm,
  // openDialog,
  // handleDelete,
  // handleDatabase,
  handleSizeChange,
  handlePageChange,
  // handleCurrentChange,
  handleSelectionChange,
  handleKeep,
  handleCancelKeep,
  handleUploadReceipt,
  handleShowReciept
} = useRole();

/** 分页配置 */
const select_pagination = reactive<PaginationProps>({
  pageSize: 1000,
  currentPage: 1,
  total: 0
});
const fee_form = reactive({
  id: "",
  code: "",
  name: ""
});
interface FeeItem {
  id: string;
  fee_name: string;
}

const upload = ref<UploadInstance>();
const fee_list = ref<FeeItem[]>([]);
const fee_options = ref<FeeItem[]>([]);
let feeData = [];
const fee_data = feeNameList({ pagination: select_pagination, form: fee_form });

fee_data.then(v => {
  feeData = v.data.list;
  fee_list.value = feeData.map(item => {
    return {
      id: `${item.id}`,
      fee_name: `${item.name}`
    };
  });
  fee_options.value = fee_list.value;
});

const feeRemoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      fee_options.value = fee_list.value.filter(item => {
        return item.fee_name.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    fee_options.value = fee_list.value;
  }
};

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
      <el-form-item label="申请日期：" prop="apply_time_range">
        <el-date-picker
          v-model="form.apply_time_range"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="记账日期：" prop="keep_time_range">
        <el-date-picker
          v-model="form.keep_time_range"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="申请编号：" prop="fee_no">
        <el-input
          v-model="form.fee_no"
          placeholder="请输入申请编号"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="费用名称：" prop="fee_name">
        <el-select
          v-model="form.fee_name"
          filterable
          remote
          reserve-keyword
          placeholder="输入费用名称关键字"
          :remote-method="feeRemoteMethod"
          :loading="loading"
          style="width: 240px"
        >
          <el-option
            v-for="item in fee_options"
            :key="item.id"
            :label="item.fee_name"
            :value="item.fee_name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="申请单位" prop="apply_department">
        <el-select
          v-model="form.apply_department"
          placeholder="请选择申请单位"
          clearable
          allow-create
          filterable
          class="!w-[180px]"
        >
          <el-option label="富安上海" value="富安上海" />
          <el-option label="富安太仓" value="富安太仓" />
          <el-option label="港鸣实业" value="港鸣实业" />
          <el-option label="濠瀚科技" value="濠瀚科技" />
          <el-option label="富安国际" value="富安国际" />
          <el-option label="鲜友网销" value="鲜友网销" />
          <el-option label="鲜友书局" value="鲜友书局" />
          <el-option label="武汉江通源" value="武汉江通源" />
          <el-option label="长沙沪源" value="长沙沪源" />
          <el-option label="众源润达" value="众源润达" />
          <el-option label="众源仁合" value="众源仁合" />
        </el-select>
      </el-form-item>
      <el-form-item label="结算单位：" prop="company_name">
        <el-input
          v-model="form.company_name"
          placeholder="请输入结算单位"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <Auth value="btn_fee_by_add_by">
        <el-form-item label="申请人：" prop="apply_by_select">
          <el-input
            v-model="form.apply_by_select"
            placeholder="请输入申请人"
            clearable
            class="!w-[200px]"
          />
        </el-form-item>
      </Auth>
      <el-form-item label="备注：" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="请输入备注"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="支付类型：" prop="pay_type">
        <el-select
          v-model="form.pay_type"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="转账" value="转账" />
          <el-option label="现金" value="现金" />
          <el-option label="支票" value="支票" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="未提交" value="未提交" />
          <el-option label="已提交" value="已提交" />
          <el-option label="已撤销" value="已撤销" />
          <el-option label="通过审核" value="通过审核" />
          <el-option label="未通过审核" value="未通过审核" />
          <el-option label="通过审批" value="通过审批" />
          <el-option label="已记账" value="已记账" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否上传水单：" prop="reciept_url">
        <el-select
          v-model="form.reciept_url"
          placeholder="请选择"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="已上传" value="已上传" />
          <el-option label="未上传" value="未上传" />
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
        <el-button
          class="reset-margin"
          type="success"
          :icon="useRenderIcon(EditPen)"
          :disabled="haveRow"
          @click="handleKeep()"
        >
          记账
        </el-button>
        <el-button
          class="reset-margin"
          type="danger"
          :icon="useRenderIcon(EditPen)"
          :disabled="haveRow"
          @click="handleCancelKeep()"
        >
          撤销记账
        </el-button>
        <el-button
          class="reset-margin"
          type="primary"
          :icon="useRenderIcon(EditPen)"
          :disabled="haveRow"
          @click="dialogVisible = true"
        >
          上传水单
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog v-model="dialogVisible" title="上传水单" width="30%">
      <el-upload
        ref="upload"
        drag
        accept="image/jpg,image/jpeg,image/png"
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :auto-upload="false"
        :http-request="handleUploadReceipt"
      >
        <template #trigger>
          <el-button type="primary">选择或拖拽文件</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip text-red">
            可手动选择或拖拽图片上传，可上传多份
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

    <PureTableBar title="费用记录" :columns="columns" @refresh="onSearch">
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
          @page-current-change="handlePageChange"
        >
          <template #reciept_url="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="handleShowReciept(row)"
              v-if="row.reciept_url != ''"
            >
              查看水单
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
</style>
