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
// import Download from "@iconify-icons/ep/download";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "FeeApplication"
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
  exportExcel,
  onSearch,
  openDialog,
  handleDelete,
  // handleDatabase,
  handleSubmit,
  handleApplyPrint,
  handleReimPrint,
  handleRevoke,
  handleRowDblclick,
  handleSizeChange,
  handlePageChange,
  handleCurrentChange,
  handleSelectionChange,
  handleShowReciept
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
      <el-form-item label="费用编号：" prop="fee_no">
        <el-input
          v-model="form.fee_no"
          placeholder="请输入费用编号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="费用名称：" prop="fee_name">
        <el-input
          v-model="form.fee_name"
          placeholder="请输入费用名称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="收/付：" prop="is_pay">
        <el-select
          v-model="form.is_pay"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="收" value="收" />
          <el-option label="付" value="付" />
        </el-select>
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
          <el-option label="结算卡" value="结算卡" />
          <el-option label="银行" value="银行" />
          <el-option label="汇票" value="汇票" />
          <el-option label="三方协议扣缴" value="三方协议扣缴" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="" />
          <el-option label="未提交" value="未提交" />
          <el-option label="已提交" value="已提交" />
          <el-option label="通过审核" value="通过审核" />
          <el-option label="未通过审核" value="未通过审核" />
          <el-option label="通过审批" value="通过审批" />
          <el-option label="已记账" value="已记账" />
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
          :icon="useRenderIcon(AddFill)"
          @click="openDialog('新增')"
        >
          申请费用
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button
          type="success"
          :icon="useRenderIcon(EditPen)"
          @click="handleSubmit()"
          :disabled="haveRow"
        >
          提交
        </el-button>
        <el-button
          type="danger"
          :icon="useRenderIcon(EditPen)"
          @click="handleRevoke()"
          :disabled="haveRow"
        >
          撤销
        </el-button>
        <el-button
          :icon="useRenderIcon(EditPen)"
          :disabled="haveRow"
          @click="handleApplyPrint()"
        >
          打印申请单
        </el-button>
        <el-button
          :icon="useRenderIcon(EditPen)"
          :disabled="haveRow"
          @click="handleReimPrint()"
        >
          打印报销单
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出费用
        </el-button>
        <!-- <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出列表
        </el-button> -->
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
      title="费用申请管理（双击修改）"
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
          @page-current-change="handlePageChange"
          @current-change="handleCurrentChange"
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
