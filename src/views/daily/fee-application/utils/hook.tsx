import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import applyPrint from "../apply-print.vue";
import reimPrint from "../reim-print.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import {
  addAppliedFee,
  appliedFeeList,
  deleteAppliedFee,
  editAppliedFee,
  revokeAppliedFee,
  submitAppliedFee
} from "@/api/daily";
import { useUserStore } from "@/store/modules/user";
import { ElMessage, ElMessageBox } from "element-plus";

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
    apply_by: user.username,
    apply_department: "",
    acc_company_id: "",
    company_name: "",
    bank: "",
    account_no: "",
    create_time: "",
    reimburse_by: "",
    audit_by: "",
    audit_time: "",
    approve_by: "",
    fee_no: "",
    invoice_no: "",
    remark: "",
    apply_time: "",
    apply_time_range: ""
  });
  const formRef = ref();
  const currentRow = ref();
  const selectRows = ref([]);
  const haveRow = ref(true);
  const dataList = ref([]);
  const loading = ref(true);
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
      label: "结算单位",
      prop: "company_name"
    },
    {
      label: "开户行",
      prop: "bank"
    },
    {
      label: "银行账号",
      prop: "account_no"
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
      label: "审核时间",
      prop: "audit_time",
      formatter: ({ audit_time }) => dayjs(audit_time).format("YYYY-MM-DD")
    },
    {
      label: "审批人",
      prop: "approve_by"
    },
    {
      label: "费用编号",
      prop: "fee_no"
    },
    {
      label: "发票号",
      prop: "invoice_no"
    },
    {
      label: "备注",
      prop: "remark"
    },
    {
      label: "申请日期",
      prop: "apply_time",
      formatter: ({ apply_time }) => dayjs(apply_time).format("YYYY-MM-DD")
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await appliedFeeList({
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
    writeFile(workBook, "挑箱列表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  async function handleDelete() {
    ElMessageBox.confirm("删除费用后需重新填写", "确认删除?", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        const select_id = [];
        selectRows.value.forEach(v => {
          select_id.push(v.id);
          if (v.status !== "未提交") {
            throw new Error("所选费用包含已提交费用");
          }
        });
        deleteAppliedFee(select_id);
        onSearch();
      })
      .catch(info => {
        if (info == "cancel") {
          info = "取消删除";
        }
        ElMessage({
          type: "error",
          message: info
        });
      });
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

  async function handleAddData(data) {
    await addAppliedFee(data);
  }

  function openDialog(title = "申请", row?: FormItemProps) {
    addDialog({
      title: `${title}费用`,
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
          apply_by: row?.apply_by ?? user.username,
          apply_department: row?.apply_department ?? "",
          acc_company_id: row?.acc_company_id ?? "",
          create_time: row?.create_time ?? "",
          reimburse_by: row?.reimburse_by ?? "",
          audit_by: row?.audit_by ?? "",
          audit_time: row?.audit_time ?? "",
          approve_by: row?.approve_by ?? "",
          fee_no: row?.fee_no ?? "",
          invoice_no:
            row && row.invoice_no.length > 0 ? row.invoice_no.split(",") : [],
          remark: row?.remark ?? "",
          apply_time: row?.apply_time ?? ""
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
              handleAddData(curData);
              chores();
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              asyncEdit(curData);
              chores();
            }
          }
        });
      }
    });
  }

  function applyDialog(title = "打印", selectRows) {
    addDialog({
      title: `申请单打印`,
      props: {
        selectRows: selectRows
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(applyPrint, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              // handleAddData(curData);
              console.log("打印");
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              // asyncEdit(curData);
              console.log("取消");
            }
          }
        });
      }
    });
  }

  function reimDialog(title = "打印", selectRows) {
    addDialog({
      title: `报销单打印`,
      props: {
        selectRows: selectRows
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(reimPrint, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              // handleAddData(curData);
              console.log("打印");
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              // asyncEdit(curData);
              console.log("取消");
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

  async function asyncEdit(data) {
    await editAppliedFee(data);
  }

  // 提交费用
  async function handleSubmit() {
    ElMessageBox.confirm("确认提交后所选费用将进入审核流程？", "提交确认", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        const select_id = [];
        selectRows.value.forEach(v => {
          select_id.push(v.id);
          if (v.status !== "未提交") {
            throw new Error("费用申请不允许重复提交");
          }
        });
        submitAppliedFee(select_id);
        onSearch();
      })
      .catch(info => {
        if (info == "cancel") {
          info = "取消提交";
        }
        ElMessage({
          type: "error",
          message: info
        });
      });
  }

  // 撤销费用
  async function handleRevoke() {
    ElMessageBox.confirm("撤销提交费用", "一键撤回", {
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    })
      .then(() => {
        const select_id = [];
        selectRows.value.forEach(v => {
          select_id.push(v.id);
          if (v.status !== "已提交") {
            throw new Error("未提交或已审核费用无法撤销");
          }
        });
        revokeAppliedFee(select_id);
        onSearch();
      })
      .catch(info => {
        if (info == "cancel") {
          info = "取消撤销";
        }
        ElMessage({
          type: "error",
          message: info
        });
      });
  }

  // 双击行
  function handleRowDblclick(row) {
    console.log(row);
    openDialog("编辑", row);
  }

  // 打印申请单
  function handleApplyPrint() {
    console.log(242131432, selectRows.value);
    applyDialog("打印申请单", selectRows.value);
  }

  // 打印报销单
  function handleReimPrint() {
    reimDialog("打印报销单", selectRows.value);
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
    handleDelete,
    // handleDatabase,
    handleSubmit,
    handleRevoke,
    handleRowDblclick,
    handleApplyPrint,
    handleReimPrint,
    handleEdit,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
