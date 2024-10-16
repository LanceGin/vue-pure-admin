// import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import { collectionContainerList, financeStatList } from "@/api/finance";

export function useRole() {
  const form = reactive({
    id: "",
    type: "应收",
    status: "",
    account_period: "",
    fee_name: "",
    custom_name: "",
    project_name: "",
    flow_direction: "",
    content: "",
    door: "",
    amount: "",
    total: "",
    f: "",
    t: "",
    is_invoice: "",
    add_by: ""
  });
  const formRef = ref();
  const dataList = ref([]);
  const containerList = ref([]);
  const loading = ref(true);
  const containerVisible = ref(false);
  // const switchLoadMap = ref({});
  // const { tagStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 200, 500],
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "客户",
      prop: "custom_name"
    },
    {
      label: "业务名称",
      prop: "project_name"
    },
    {
      label: "门点",
      prop: "door"
    },
    {
      label: "20",
      prop: "t"
    },
    {
      label: "40",
      prop: "f"
    },
    {
      label: "箱量合计",
      prop: "total"
    },
    {
      label: "应收金额",
      prop: "amount"
    },
    {
      label: "结算金额",
      prop: "amount"
    },
    {
      label: "开票金额",
      prop: "amount"
    }
  ];

  const containerColumns: TableColumnList = [
    {
      label: "箱号",
      prop: "containner_no"
    },
    {
      label: "封号",
      prop: "seal_no"
    },
    {
      label: "箱型",
      prop: "container_type"
    },
    {
      label: "提箱码头",
      prop: "load_port"
    },
    {
      label: "门点",
      prop: "door"
    },
    {
      label: "费用",
      prop: "amount"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await financeStatList({
      pagination: export_pagination,
      form
    });
    const res = data.list.map(item => {
      const arr = [];
      columns.forEach(column => {
        arr.push(item[column.prop as string]);
      });
      return arr;
    });
    const titleList = [];
    columns.forEach(column => {
      titleList.push(column.label);
    });
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "数据报表");
    writeFile(workBook, "应收报表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  function handleDelete(row) {
    message(`您删除了订单号为${row.order_no}的这条数据`, { type: "success" });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await financeStatList({
      pagination,
      form
    });
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
      title: `${title}车辆`,
      props: {
        formInline: {
          id: row?.id ?? "",
          type: row?.type ?? "",
          status: row?.status ?? "",
          account_period: row?.account_period ?? "",
          fee_name: row?.fee_name ?? "",
          custom_name: row?.custom_name ?? "",
          project_name: row?.project_name ?? "",
          flow_direction: row?.flow_direction ?? "",
          content: row?.content ?? "",
          door: row?.door ?? "",
          amount: row?.amount ?? "",
          total: row?.total ?? "",
          f: row?.f ?? "",
          t: row?.t ?? "",
          is_invoice: row?.is_invoice ?? "",
          add_by: row?.add_by ?? ""
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
          message(`您${title}了客户为${curData.custom_name}的这条数据`, {
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

  // 双击行
  async function handleRowDblclick(form) {
    collectionContainerList({
      form
    }).then(data => {
      containerList.value = data.data.list;
      containerVisible.value = true;
    });
  }

  /** 菜单权限 */
  function handleMenu() {
    message("等菜单管理页面开发后完善");
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    containerVisible,
    columns,
    containerColumns,
    dataList,
    containerList,
    pagination,
    // buttonClass,
    exportExcel,
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleDelete,
    handleRowDblclick,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
