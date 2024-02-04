import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import { appliedFeeList } from "@/api/daily";
import { ElMessage, ElMessageBox } from "element-plus";
import { cancelKeepAppliedFee, keepAppliedFee } from "@/api/finance";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
  const user = useUserStore();
  const form = reactive({
    id: "",
    status: "",
    is_admin: "",
    fee_name: "",
    is_pay: "",
    pay_type: "",
    apply_amount: "",
    reimburse_amount: "",
    tax_amount: "",
    apply_by: "",
    apply_department: "",
    create_time: "",
    reimburse_by: "",
    audit_by: "",
    audit_time: "",
    approve_by: "",
    fee_no: "",
    remark: "",
    apply_time: "",
    keep_by: "",
    keep_time: ""
  });
  const formRef = ref();
  const haveRow = ref(true);
  const selectRows = ref([]);
  const dataList = ref([]);
  const loading = ref(true);
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
      type: "selection",
      align: "left"
    },
    {
      label: "状态",
      prop: "status"
    },
    {
      label: "行政/业务",
      prop: "is_admin"
    },
    {
      label: "费用名称",
      prop: "fee_name"
    },
    {
      label: "收/付",
      prop: "is_pay"
    },
    {
      label: "支付类型",
      prop: "pay_type"
    },
    {
      label: "申请金额",
      prop: "apply_amount"
    },
    {
      label: "报销金额",
      prop: "reimburse_amount"
    },
    {
      label: "税额",
      prop: "tax_amount"
    },
    {
      label: "申请人",
      prop: "apply_by"
    },
    {
      label: "申请单位",
      prop: "apply_department"
    },
    {
      label: "录入时间",
      prop: "create_time",
      formatter: ({ create_time }) => dayjs(create_time).format("YYYY-MM-DD")
    },
    {
      label: "报销人",
      prop: "reimburse_by"
    },
    {
      label: "审核人",
      prop: "audit_by"
    },
    {
      label: "审批人",
      prop: "approve_by"
    },
    {
      label: "记账人",
      prop: "keep_by"
    },
    {
      label: "费用编号",
      prop: "fee_no"
    },
    {
      label: "记账时间",
      prop: "keep_time",
      formatter: ({ keep_time }) => dayjs(keep_time).format("YYYY-MM-DD")
    },
    {
      label: "备注",
      prop: "remark"
    }
  ];

  function exportExcel() {
    const res = dataList.value.map(item => {
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
    writeFile(workBook, "挑箱列表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  // function handleDelete() {
  //   message(`您删除了费用名为${multipleSelection.value}的这条数据`, {
  //     type: "success"
  //   });
  //   onSearch();
  // }

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

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
    selectRows.value = val;
    if (selectRows.value.length > 0) {
      haveRow.value = false;
    } else {
      haveRow.value = true;
    }
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await appliedFeeList({
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
      title: `${title}费用记录`,
      props: {
        formInline: {
          id: row?.id ?? "",
          status: row?.status ?? "",
          is_admin: row?.is_admin ?? "",
          fee_name: row?.fee_name ?? "",
          is_pay: row?.is_pay ?? "",
          pay_type: row?.pay_type ?? "",
          apply_amount: row?.apply_amount ?? "",
          reimburse_amount: row?.reimburse_amount ?? "",
          tax_amount: row?.tax_amount ?? "",
          apply_by: row?.apply_by ?? "",
          apply_department: row?.apply_department ?? "",
          create_time: row?.create_time ?? "",
          reimburse_by: row?.reimburse_by ?? "",
          audit_by: row?.audit_by ?? "",
          audit_time: row?.audit_time ?? "",
          approve_by: row?.approve_by ?? "",
          fee_no: row?.fee_no ?? "",
          remark: row?.remark ?? "",
          apply_time: row?.apply_time ?? "",
          keep_by: row?.keep_by ?? "",
          keep_time: row?.keep_time ?? ""
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
          message(`您${title}了费用名为${curData.fee_name}的这条数据`, {
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

  // 记账
  async function handleKeep() {
    ElMessageBox.prompt("请输入记账时间", "记账确认", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      inputType: "date"
    })
      .then(keep_time => {
        const select_id = [];
        selectRows.value.forEach(v => {
          select_id.push(v.id);
          if (v.status !== "通过审批") {
            throw new Error("所选费用未全部通过审批");
          }
        });
        const data = {
          select_id: select_id,
          username: user.username,
          keep_time: keep_time
        };
        keepAppliedFee(data);
        onSearch();
      })
      .catch(info => {
        if (info == "cancel") {
          info = "取消记账";
        }
        ElMessage({
          type: "info",
          message: info
        });
      });
  }

  // 记账
  async function handleCancelKeep() {
    ElMessageBox.confirm("确认撤销记账？", "撤销记账确认", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        const select_id = [];
        selectRows.value.forEach(v => {
          select_id.push(v.id);
          if (v.status !== "已记账") {
            throw new Error("所选费用未全部记账");
          }
        });
        cancelKeepAppliedFee(select_id);
        onSearch();
      })
      .catch(info => {
        if (info == "cancel") {
          info = "取消";
        }
        ElMessage({
          type: "info",
          message: info
        });
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
    haveRow,
    columns,
    dataList,
    pagination,
    // buttonClass,
    exportExcel,
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    // handleDelete,
    // handleDatabase,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange,
    handleKeep,
    handleCancelKeep
  };
}
