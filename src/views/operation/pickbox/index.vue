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
// import AddFill from "@iconify-icons/ri/add-circle-line";

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
      <el-form-item label="船期" prop="chuanqi">
        <el-input
          v-model="form.chuanqi"
          placeholder="请输入船期"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="船名/航次" prop="chuanming">
        <el-input
          v-model="form.chuanming"
          placeholder="请输入船名/航次"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="运单号" prop="yundanhao">
        <el-input
          v-model="form.yundanhao"
          placeholder="请输入运单号"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>

      <el-form-item label="状态" prop="zhuangtai">
        <el-select
          v-model="form.zhuangtai"
          placeholder="请选择状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="未挑箱" value="0" />
          <el-option label="已挑箱" value="1" />
        </el-select>
      </el-form-item>

      <el-form-item label="箱号" prop="xianghao">
        <el-input
          v-model="form.xianghao"
          placeholder="请输入箱号"
          autosize
          type="textarea"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="门点" prop="mendian">
        <el-input
          v-model="form.mendian"
          placeholder="请输入门点"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="计划做箱时间" prop="jihuashijian">
        <el-input
          v-model="form.jihuashijian"
          placeholder="请输入计划做箱时间"
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
        <el-button :icon="useRenderIcon(EditPen)" @click="resetForm(formRef)">
          暂落
        </el-button>
        <el-button :icon="useRenderIcon(EditPen)" @click="resetForm(formRef)">
          挑箱
        </el-button>
        <el-button :icon="useRenderIcon(EditPen)" @click="resetForm(formRef)">
          批量修改提箱点
        </el-button>
        <el-button :icon="useRenderIcon(Download)" @click="resetForm(formRef)">
          导入
        </el-button>
        <el-button :icon="useRenderIcon(Upload)" @click="resetForm(formRef)">
          导出
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar
      title="挑箱（测试用，操作后不生效）"
      :columns="columns"
      @refresh="onSearch"
    >
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
