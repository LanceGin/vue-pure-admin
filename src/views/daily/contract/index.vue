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

defineOptions({
  name: "Role"
});

const formRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  // buttonClass,
  onSearch,
  resetForm,
  openDialog,
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
      <el-form-item label="签订日期：" prop="qiandingriqi">
        <el-input
          v-model="form.qiandingriqi"
          placeholder="请输入签订日期"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="终止日期：" prop="zhongzhiriqi">
        <el-input
          v-model="form.zhongzhiriqi"
          placeholder="请输入终止日期"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="合同编号：" prop="bianhao">
        <el-input
          v-model="form.bianhao"
          placeholder="请输入合同编号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="合同余款：" prop="yukuan">
        <el-input
          v-model="form.yukuan"
          placeholder="请输入合同余款"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="合同类型：" prop="leixing">
        <el-select
          v-model="form.leixing"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="0" />
          <el-option label="物流运输" value="1" />
          <el-option label="挂靠协议" value="2" />
          <el-option label="购买车辆" value="3" />
          <el-option label="车辆租赁" value="4" />
          <el-option label="承包运营" value="5" />
          <el-option label="商业保险" value="6" />
          <el-option label="行政" value="7" />
          <el-option label="其他" value="8" />
        </el-select>
      </el-form-item>
      <el-form-item label="履行情况：" prop="hetongzhuangtai">
        <el-select
          v-model="form.hetongzhuangtai"
          placeholder="请选择情况"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="0" />
          <el-option label="履行中" value="1" />
          <el-option label="到期终止" value="2" />
          <el-option label="异常-变更" value="3" />
          <el-option label="异常-解除" value="4" />
          <el-option label="异常-违约" value="5" />
        </el-select>
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
        <el-button :icon="useRenderIcon(EditPen)" @click="resetForm(formRef)">
          调整已支付金额
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="resetForm(formRef)">
          上传合同
        </el-button>
        <el-button :icon="useRenderIcon(Download)" @click="resetForm(formRef)">
          下载合同
        </el-button>
        <el-button :icon="useRenderIcon(Download)" @click="resetForm(formRef)">
          合同模板
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar
      title="合同管理（测试用，操作后不生效）"
      :columns="columns"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
        >
          添加合同
        </el-button>
      </template>
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
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="openDialog('编辑', row)"
            >
              修改
            </el-button>
            <el-popconfirm
              :title="`是否确认删除合同名称为${row.mingcheng}的这条数据`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(Delete)"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
            <!-- <el-dropdown>
              <el-button
                class="ml-3 mt-[2px]"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(More)"
              />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button
                      :class="buttonClass"
                      link
                      type="primary"
                      :size="size"
                      :icon="useRenderIcon(Menu)"
                      @click="handleMenu"
                    >
                      菜单权限
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      :class="buttonClass"
                      link
                      type="primary"
                      :size="size"
                      :icon="useRenderIcon(Database)"
                      @click="handleDatabase"
                    >
                      数据权限
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown> -->
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
