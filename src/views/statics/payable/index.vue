<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../components/RePureTableBar";
import { useRenderIcon } from "../../../components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
// import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";
import {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  genFileId,
  ElMessageBox
} from "element-plus";

defineOptions({
  name: "Payable"
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
  total_amount,
  // buttonClass,
  exportExcel,
  onSearch,
  openDialog,
  confirmDialog,
  uploadExcelDetail,
  // handleDelete,
  // handleDatabase,
  handleRevoke,
  handleSizeChange,
  handlePageChange,
  handleCurrentChange,
  handleSelectionChange,
  // handleSetInvoiceNo,
  handleSetAmount,
  handleSetRemark
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
  ElMessageBox.confirm("确定取消数据对比？")
    .then(() => {
      // then
      dialogVisible.value = false;
    })
    .catch(() => {
      // catch error
    });
};

//指定列求和
const getSummaries = param => {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    const values = data.map(item => Number(item[column.property]));
    if (["amount"].includes(column.property)) {
      sums[4] = values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!isNaN(value)) {
          return Number((Number(prev) + Number(curr)).toFixed(2));
        } else {
          return Number(Number(prev).toFixed(2));
        }
      }, 0);
      sums[4];
    }
    if (["actual_amount"].includes(column.property)) {
      sums[5] = values.reduce((prev, curr) => {
        // console.log(111111, prev, curr);
        const value = Number(curr);
        if (!isNaN(value)) {
          return Number(Number(prev) + Number(curr));
        } else {
          return Number(Number(prev));
        }
      }, 0);
      sums[5] = sums[5].toFixed(2);
    }
    if (index === 0) {
      return;
    }
  });
  sums[1] = `合计`;
  sums[2] = Math.round(total_amount.value * 100) / 100;
  sums[3] = `单页合计`;
  return sums;
};
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-2 pt-[6px]"
    >
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择状态"
          clearable
          class="!w-[120px]"
        >
          <el-option label="全部" value="" />
          <el-option label="未提交" value="未提交" />
          <el-option label="已确认" value="已确认" />
          <el-option label="未审核" value="未审核" />
          <el-option label="已审核" value="已审核" />
          <el-option label="已驳回" value="已驳回" />
        </el-select>
      </el-form-item>
      <el-form-item label="单据类型：" prop="order_type">
        <el-select
          v-model="form.order_type"
          placeholder="请选择单据类型"
          clearable
          class="!w-[120px]"
        >
          <el-option label="全部" value="" />
          <el-option label="进口" value="进口" />
          <el-option label="暂落" value="暂落" />
          <el-option label="出口" value="出口" />
          <el-option label="陆运" value="陆运" />
          <el-option label="散货" value="散货" />
          <el-option label="船运" value="船运" />
        </el-select>
      </el-form-item>
      <el-form-item label="做箱时间：" prop="make_time_range">
        <el-date-picker
          v-model="form.make_time_range"
          type="daterange"
          start-placeholder="起始日期"
          end-placeholder="截止日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="运单号：" prop="track_no">
        <el-input
          v-model="form.track_no"
          placeholder="请输入运单号"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="码头堆场：" prop="load_port">
        <el-input
          v-model="form.load_port"
          placeholder="请输入码头堆场"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="费用名称：" prop="fee_name">
        <el-select
          v-model="form.fee_name"
          placeholder="请选择费用名称"
          clearable
          filterable
          allow-create
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="打单费" value="打单费" />
          <el-option label="计划费" value="计划费" />
          <el-option label="拖车费" value="拖车费" />
          <el-option label="堆存费" value="堆存费" />
          <el-option label="上下车费" value="上下车费" />
          <el-option label="堆存杂项包干费" value="堆存杂项包干费" />
          <el-option label="待时费" value="待时费" />
          <el-option label="换单费" value="换单费" />
          <el-option label="改单费" value="改单费" />
          <el-option label="改港费" value="改港费" />
          <el-option label="放空" value="放空" />
          <el-option label="散货运费" value="散货运费" />
          <el-option label="暂落费" value="暂落费" />
          <el-option label="水运费" value="水运费" />
          <el-option label="用箱超期费" value="用箱超期费" />
          <el-option label="码头杂费" value="码头杂费" />
          <el-option label="落箱费" value="落箱费" />
          <el-option label="过磅费" value="过磅费" />
          <el-option label="还箱费" value="还箱费" />
          <el-option label="铅封费" value="铅封费" />
          <el-option label="陆运异常费" value="陆运异常费" />
          <el-option label="陆运费" value="陆运费" />
          <el-option label="高速服务费" value="高速服务费" />
          <el-option label="高速费" value="高速费" />
        </el-select>
      </el-form-item>
      <el-form-item label="车辆：" prop="car_no">
        <el-input
          v-model="form.car_no"
          placeholder="请输入车辆"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="客户简称：" prop="customer">
        <el-input
          v-model="form.customer"
          placeholder="请输入客户简称"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="供应商：" prop="car_owner">
        <el-input
          v-model="form.car_owner"
          placeholder="请输入供应商"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="暂落点：" prop="temp_port">
        <el-input
          v-model="form.temp_port"
          placeholder="请输入暂落点"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="门点：" prop="door">
        <el-input
          v-model="form.door"
          placeholder="请输入门点"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="费用备注：" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="请输入备注"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="确认备注：" prop="confirm_remark">
        <el-input
          v-model="form.confirm_remark"
          placeholder="请输入确认备注"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="起始港：" prop="start_port">
        <el-input
          v-model="form.start_port"
          placeholder="请输入起始港"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="目的港：" prop="target_port">
        <el-input
          v-model="form.target_port"
          placeholder="请输入目的港"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="箱型：" prop="container_type">
        <el-input
          v-model="form.container_type"
          placeholder="请输入箱型"
          clearable
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="箱号" prop="containner_no">
        <el-input
          v-model="form.containner_no"
          placeholder="多箱号换行输入，单箱号支持模糊搜索"
          :autosize="{ minRows: 2, maxRows: 5 }"
          type="textarea"
          clearable
          class="!w-[120px]"
        />
        <el-button link type="primary" @click="form.containner_no = ''"
          >清空</el-button
        >
      </el-form-item>
      <el-form-item label="地区：" prop="city_type">
        <el-select
          v-model="form.city_type"
          placeholder="请选择地区"
          clearable
          class="!w-[180px]"
        >
          <el-option label="上海" value="上海" />
          <el-option label="太仓" value="太仓" />
          <el-option label="武汉" value="武汉" />
          <el-option label="岳阳" value="岳阳" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-2 pt-[6px]"
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
          :icon="useRenderIcon(EditPen)"
          @click="confirmDialog('确认')"
          :disabled="haveRow"
        >
          确认
        </el-button>
        <el-button
          :icon="useRenderIcon(EditPen)"
          @click="handleRevoke()"
          :disabled="haveRow"
        >
          撤销确认
        </el-button>
        <el-button
          :icon="useRenderIcon(EditPen)"
          @click="openDialog('提交')"
          :disabled="haveRow"
        >
          提交
        </el-button>
        <!-- <el-button
          :icon="useRenderIcon(EditPen)"
          @click="handleSetInvoiceNo()"
          :disabled="haveRow"
        >
          设置发票号
        </el-button> -->
        <el-button :icon="useRenderIcon(EditPen)" @click="dialogVisible = true">
          数据比对
        </el-button>
        <el-button
          :icon="useRenderIcon(EditPen)"
          @click="handleSetAmount()"
          :disabled="haveRow"
        >
          批量调整金额
        </el-button>
        <el-button
          :icon="useRenderIcon(EditPen)"
          @click="handleSetRemark()"
          :disabled="haveRow"
        >
          批量备注
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog v-model="dialogVisible" title="数据比对" width="30%">
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
            导入文件字段格式为 箱号-运单号(非必填)-箱型-门点
          </div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitUpload"> 比对 </el-button>
        </span>
      </template>
    </el-dialog>

    <PureTableBar title="应付费用" :columns="columns" @refresh="onSearch">
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          show-summary
          :summary-method="getSummaries"
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
          @current-change="handleCurrentChange"
          @page-current-change="handlePageChange"
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

.el-form--inline {
  .el-form-item {
    margin-right: 10px;
  }
}
</style>
