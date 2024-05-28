import { utils, writeFile } from "xlsx";
import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import {
  approvePay,
  collectionContainerList,
  financeCheckList,
  rejectPay
} from "@/api/finance";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
  const user = useUserStore();
  const form = reactive({
    id: "",
    type: "应付",
    status: "未审核",
    account_period: "",
    custom_name: "",
    project_name: "",
    flow_direction: "",
    acc_company: "",
    company_name: "",
    content: "",
    amount: "",
    less_amount: "",
    more_amount: "",
    actual_amount: "",
    remark: "",
    total: "",
    f: "",
    t: "",
    apply_by: "",
    city: user.city,
    city_type: ""
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
      label: "账期",
      prop: "account_period",
      formatter: ({ account_period }) => dayjs(account_period).format("YYYY-MM")
    },
    {
      label: "供应商",
      prop: "custom_name"
    },
    {
      label: "结算单位",
      prop: "company_name"
    },
    {
      label: "服务内容",
      prop: "content"
    },
    {
      label: "40",
      prop: "f"
    },
    {
      label: "20",
      prop: "t"
    },
    {
      label: "箱量合计",
      prop: "total"
    },
    {
      label: "结算金额",
      prop: "amount"
    },
    {
      label: "扣除金额",
      prop: "less_amount"
    },
    {
      label: "增加金额",
      prop: "more_amount"
    },
    {
      label: "实付金额",
      prop: "actual_amount"
    },
    {
      label: "备注",
      prop: "remark"
    },
    {
      label: "审核",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];

  const containerColumns: TableColumnList = [
    {
      label: "运单号",
      prop: "track_no"
    },
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
      label: "做箱时间",
      prop: "make_time",
      formatter: ({ make_time }) => dayjs(make_time).format("YYYY-MM-DD")
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
      label: "车号",
      prop: "car_no"
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

  function exportExcel() {
    const res = containerList.value.map(item => {
      const arr = [];
      containerColumns.forEach(column => {
        arr.push(item[column.prop as string]);
      });
      return arr;
    });
    const titleList = [];
    containerColumns.forEach(column => {
      titleList.push(column.label);
    });
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "数据报表");
    writeFile(workBook, "应付费用明细.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  function handleDelete(row) {
    message(`您删除了角色名称为${row.name}的这条数据`, { type: "success" });
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
    const { data } = await financeCheckList({
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
      title: `${title}驾驶员`,
      props: {
        formInline: {
          id: row?.id ?? "",
          type: row?.type ?? "应付",
          status: row?.status ?? "未审核",
          account_period: row?.account_period ?? "",
          custom_name: row?.custom_name ?? "",
          project_name: row?.project_name ?? "",
          flow_direction: row?.flow_direction ?? "",
          content: row?.content ?? "",
          amount: row?.amount ?? "",
          total: row?.total ?? "",
          f: row?.f ?? "",
          t: row?.t ?? ""
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
          message(`您${title}了供应商名称为${curData.custom_name}的这条数据`, {
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

  // 审核通过
  function handleApprove(row) {
    row.add_by = user.username;
    console.log(row);
    approvePay(row);
    onSearch();
  }

  // 审核驳回
  function handleReject(row) {
    console.log(row);
    rejectPay(row);
    onSearch();
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
    handleApprove,
    handleReject,
    handleRowDblclick,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
