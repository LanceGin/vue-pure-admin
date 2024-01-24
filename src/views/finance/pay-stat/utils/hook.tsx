// import dayjs from "dayjs";
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
    type: "应付",
    status: "",
    account_period: "",
    custom_name: "",
    project_name: "",
    flow_direction: "",
    bank: "",
    account_no: "",
    content: "",
    door: "",
    amount: "",
    less_amount: "",
    more_amount: "",
    actual_amount: "",
    total: "",
    f: "",
    t: "",
    invoice_no: "",
    keep_time: "",
    remark: ""
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
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "应付单位",
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
      label: "应付金额",
      prop: "amount"
    },
    {
      label: "实付金额",
      prop: "actual_amount"
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
      label: "卸货门点",
      prop: "door"
    },
    {
      label: "结算费用",
      prop: "amount"
    },
    {
      label: "扣除费用",
      prop: "less_amount"
    },
    {
      label: "增加费用",
      prop: "more_amount"
    },
    {
      label: "实付费用",
      prop: "actual_amount"
    }
  ];

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
          custom_name: row?.custom_name ?? "",
          project_name: row?.project_name ?? "",
          flow_direction: row?.flow_direction ?? "",
          bank: row?.bank ?? "",
          account_no: row?.account_no ?? "",
          content: row?.content ?? "",
          door: row?.door ?? "",
          amount: row?.amount ?? "",
          less_amount: row?.less_amount ?? "",
          more_amount: row?.more_amount ?? "",
          actual_amount: row?.actual_amount ?? "",
          total: row?.total ?? "",
          f: row?.f ?? "",
          t: row?.t ?? "",
          invoice_no: row?.invoice_no ?? "",
          keep_time: row?.keep_time ?? "",
          remark: row?.remark ?? ""
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
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleRowDblclick,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
