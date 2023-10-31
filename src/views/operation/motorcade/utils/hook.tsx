import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getMotorcadeList } from "@/api/operation";
// import { ElMessageBox } from "element-plus";
// import { tableData } from "./data";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
// import { func } from "vue-types";

export function useRole() {
  const form = reactive({
    companyShortName: "",
    companyName: "",
    companyAddress: "",
    companyContact: "",
    companyPhone1: "",
    state: "",
    project: "",
    mendian: "",
    zixiangmu: ""
  });
  const formRef = ref();
  const currentRow = ref();
  const haveRow = ref(true);
  const dataList = ref([]);
  const loading = ref(true);
  // const switchLoadMap = ref({});
  const { tagStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "客户简称",
      prop: "companyShortName"
    },
    {
      label: "客户全称",
      prop: "companyName"
    },
    {
      label: "企业地址",
      prop: "companyAddress"
    },
    {
      label: "联系人",
      prop: "companyContact"
    },
    {
      label: "联系电话",
      prop: "companyPhone1"
    },
    {
      label: "状态",
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.state)}>
          {row.state === "正常" ? "正常" : "停用"}
        </el-tag>
      )
    },
    {
      label: "创建时间",
      prop: "registerTime",
      formatter: ({ registerTime }) =>
        dayjs(registerTime).format("YYYY-MM-DD HH:mm:ss")
    }
  ];

  function handleDelete() {
    message(`您删除了角色名称为${currentRow.value.name}的这条数据`, {
      type: "success"
    });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
    pagination.pageSize = val;
    onSearch();
  }

  function handlePageChange(val: number) {
    console.log(`current page: ${val}`);
    pagination.currentPage = val;
    onSearch();
  }

  function handleCurrentChange(val) {
    currentRow.value = val;
    haveRow.value = false;
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getMotorcadeList({
      pagination,
      form
    });
    console.log(1111, data.list);
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}客户`,
      props: {
        formInline: {
          companyName: row?.companyName ?? "",
          companyShortName: row?.companyShortName ?? "",
          companyAddress: row?.companyAddress ?? "",
          companyContact: row?.companyContact ?? "",
          companyPhone1: row?.companyPhone1 ?? "",
          state: row?.state ?? "",
          project: row?.project ?? "",
          mendian: row?.mendian ?? "",
          zixiangmu: row?.zixiangmu ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了公司名称为${curData.companyName}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              chores();
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  // 编辑按钮
  function handleEdit() {
    openDialog("编辑", currentRow.value);
  }

  // 双击行
  function handleRowDblclick(row) {
    console.log(row);
    openDialog("编辑", row);
  }

  /** 菜单权限 */
  function handleMenu() {
    message("等菜单管理页面开发后完善");
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(() => {
    onSearch();
    console.log(haveRow.value);
  });

  return {
    form,
    loading,
    haveRow,
    columns,
    dataList,
    pagination,
    // buttonClass,
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleDelete,
    handleEdit,
    handleRowDblclick,
    // handleDatabase,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
