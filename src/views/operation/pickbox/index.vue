<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "../../../components/RePureTableBar";
import { useRenderIcon } from "../../../components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Upload from "@iconify-icons/ep/upload";
// import Download from "@iconify-icons/ep/download";
import Delete from "@iconify-icons/ep/delete";

defineOptions({
  name: "PickBox"
});

const formRef = ref();
const {
  form,
  loading,
  haveRow,
  columns,
  dataList,
  pagination,
  exportExcel,
  onSearch,
  pickDialog,
  handleSizeChange,
  handlePageChange,
  handleCurrentChange,
  handleSelectionChange,
  handleDeleteContainer,
  handlePickBox,
  // handleTempDrop,
  handlePlanTime,
  handleArriveTime,
  // handleLoadPort,
  handleSetting
} = useRole();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-2 pt-[6px]"
    >
      <el-form-item label="船期" prop="arrive_time">
        <el-date-picker
          v-model="form.arrive_time"
          type="date"
          placeholder="请输入船期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          class="!w-[120px]"
        />
      </el-form-item>
      <el-form-item label="船名/航次" prop="ship_name">
        <el-input
          v-model="form.ship_name"
          placeholder="请输入船名/航次"
          clearable
          class="!w-[120px]"
          name="ship_name"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item label="运单号" prop="track_no">
        <el-input
          v-model="form.track_no"
          placeholder="请输入运单号"
          clearable
          class="!w-[120px]"
          name="track_no"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item label="箱状态" prop="container_status">
        <el-select
          v-model="form.container_status"
          placeholder="请选择状态"
          clearable
          class="!w-[120px]"
        >
          <el-option label="全部" value="" />
          <el-option label="待挑箱" value="待挑箱" />
          <el-option label="已挑箱" value="已挑箱" />
          <el-option label="运输中" value="运输中" />
          <el-option label="已完成" value="已完成" />
        </el-select>
      </el-form-item>

      <el-form-item label="暂落状态" prop="temp_status">
        <el-select
          v-model="form.temp_status"
          placeholder="请选择状态"
          clearable
          class="!w-[120px]"
        >
          <el-option label="全部" value="" />
          <el-option label="已暂落" value="已暂落" />
          <el-option label="未暂落" value="未暂落" />
        </el-select>
      </el-form-item>

      <el-form-item label="箱号" prop="containner_no">
        <el-input
          v-model="form.containner_no"
          placeholder="多箱号换行输入"
          :autosize="{ minRows: 2, maxRows: 5 }"
          type="textarea"
          clearable
          class="!w-[120px]"
          name="containner_no"
          autocomplete="on"
        />
        <el-button link type="primary" @click="form.containner_no = ''"
          >清空</el-button
        >
      </el-form-item>
      <el-form-item label="门点" prop="door">
        <el-input
          v-model="form.door"
          placeholder="请输入门点"
          clearable
          class="!w-[120px]"
          name="door"
          autocomplete="on"
        />
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
          type="primary"
          :icon="useRenderIcon(EditPen)"
          @click="pickDialog()"
          :disabled="haveRow"
        >
          暂落
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(EditPen)"
          @click="handlePickBox()"
          :disabled="haveRow"
        >
          挑箱
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(EditPen)"
          @click="handleSetting()"
          :disabled="haveRow"
        >
          修改箱信息
        </el-button>
        <Auth value="btn_plantime">
          <el-button
            type="primary"
            :icon="useRenderIcon(EditPen)"
            @click="handlePlanTime()"
            :disabled="haveRow"
          >
            修改计划时间
          </el-button>
        </Auth>
        <el-button
          type="primary"
          :icon="useRenderIcon(EditPen)"
          @click="handleArriveTime()"
          :disabled="haveRow"
        >
          修改船期
        </el-button>
        <el-button
          type="danger"
          :icon="useRenderIcon(Delete)"
          @click="handleDeleteContainer()"
          :disabled="haveRow"
        >
          删除
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="exportExcel()">
          导出
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="挑箱" :columns="columns" @refresh="onSearch">
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
    margin-bottom: 4px;
  }
}

.el-form--inline {
  .el-form-item {
    margin-right: 10px;
  }
}
</style>
