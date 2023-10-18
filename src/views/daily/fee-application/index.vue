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
      <el-form-item label="申请日期：" prop="shenqingriqi">
        <el-input
          v-model="form.shenqingriqi"
          placeholder="请输入申请日期"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="费用编号：" prop="feiyongbianhao">
        <el-input
          v-model="form.feiyongbianhao"
          placeholder="请输入费用编号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="费用名称：" prop="feiyongming">
        <el-input
          v-model="form.feiyongming"
          placeholder="请输入费用名称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="申请人：" prop="shenqingren">
        <el-input
          v-model="form.shenqingren"
          placeholder="请输入申请人"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="申请单位：" prop="shenqingdanwei">
        <el-input
          v-model="form.shenqingdanwei"
          placeholder="请输入申请单位"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="收/付：" prop="shoufu">
        <el-select
          v-model="form.shoufu"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="0" />
          <el-option label="收" value="1" />
          <el-option label="付" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="支付类型：" prop="zhifuleixing">
        <el-select
          v-model="form.zhifuleixing"
          placeholder="请选择类型"
          clearable
          class="!w-[180px]"
        >
          <el-option label="全部" value="0" />
          <el-option label="转账" value="1" />
          <el-option label="现金" value="2" />
          <el-option label="支票" value="3" />
          <el-option label="结算卡" value="4" />
          <el-option label="银行" value="5" />
          <el-option label="汇票" value="6" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态：" prop="zhuangtai">
        <el-select
          v-model="form.zhuangtai"
          placeholder="请选择状态"
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
          <el-option label="已记账" value="6" />
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
        <el-button
          type="success"
          :icon="useRenderIcon(EditPen)"
          @click="resetForm(formRef)"
        >
          提交
        </el-button>
        <el-button
          type="danger"
          :icon="useRenderIcon(EditPen)"
          @click="resetForm(formRef)"
        >
          撤销
        </el-button>
        <el-button :icon="useRenderIcon(EditPen)" @click="resetForm(formRef)">
          打印申请单
        </el-button>
        <el-button :icon="useRenderIcon(EditPen)" @click="resetForm(formRef)">
          打印报销单
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="resetForm(formRef)">
          导出费用
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="resetForm(formRef)">
          导出列表
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar
      title="费用申请管理（测试用，操作后不生效）"
      :columns="columns"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
        >
          申请费用
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
              :title="`是否确认删除客户名称为${row.name}的这条数据`"
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
