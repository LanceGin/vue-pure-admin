import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import submitForm from "../submit.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import {
  addVehicleFee,
  deleteVehicleFee,
  editVehicleFee,
  submitVehicleFee,
  vehicleFeeList
} from "@/api/vehicle";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
  const user = useUserStore();
  const form = reactive({
    id: "",
    is_submit: "",
    add_time: "",
    driver: "",
    company: "",
    car_no: "",
    hang_board_no: "",
    type: "",
    car_fees: "",
    content: "",
    quantity: "",
    amount: "",
    allocation_month: "",
    actual_amount: "",
    tax_amount: "",
    settlement_confirm: "",
    annex_url: "",
    remark: "",
    add_by: user.username
  });
  const formRef = ref();
  const selectRows = ref([]);
  const multipleSelection = ref([]);
  const haveRow = ref(true);
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
      label: "是否已提交",
      prop: "is_submit"
    },
    {
      label: "日期",
      prop: "add_time",
      formatter: ({ add_time }) => dayjs(add_time).format("YYYY-MM-DD")
    },
    {
      label: "司机",
      prop: "driver"
    },
    {
      label: "申请单位",
      prop: "company"
    },
    {
      label: "车头号",
      prop: "car_no"
    },
    {
      label: "车挂号",
      prop: "hang_board_no"
    },
    {
      label: "支付类型",
      prop: "type"
    },
    {
      label: "费用名称",
      prop: "car_fees"
    },
    {
      label: "申请金额（元）",
      prop: "amount"
    },
    {
      label: "报销金额",
      prop: "actual_amount"
    },
    {
      label: "税额",
      prop: "tax_amount"
    },
    {
      label: "附件",
      prop: "annex_url"
    },
    {
      label: "备注",
      prop: "remark"
    },
    {
      label: "分摊月份",
      prop: "allocation_month"
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
    writeFile(workBook, "车辆费用信息.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  async function handleDelete() {
    const data = {
      select_id: []
    };
    selectRows.value.forEach(v => {
      data.select_id.push(v.id);
    });
    message(`您删除了id为${data.select_id}的数据`, {
      type: "success"
    });
    console.log(11111, data);
    await deleteVehicleFee(data);
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
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    multipleSelection.value = val;
    selectRows.value = val;
    if (selectRows.value.length > 0) {
      haveRow.value = false;
    } else {
      haveRow.value = true;
    }
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await vehicleFeeList({
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
    await addVehicleFee(data);
  }

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}费用`,
      props: {
        formInline: {
          id: row?.id ?? "",
          is_submit: row?.is_submit ?? "未提交",
          add_time: row?.add_time ?? "",
          driver: row?.driver ?? "",
          company: row?.company ?? "",
          car_no: row?.car_no ?? "",
          hang_board_no: row?.hang_board_no ?? "",
          type: row?.type ?? "",
          car_fees: row?.car_fees ?? "",
          content: row?.content ?? "",
          quantity: row?.quantity ?? "",
          amount: row?.amount ?? "",
          allocation_month: row?.allocation_month ?? "",
          actual_amount: row?.actual_amount ?? "",
          tax_amount: row?.tax_amount ?? "",
          settlement_confirm: row?.settlement_confirm ?? "",
          annex_url: row?.annex_url ?? "",
          remark: row?.remark ?? "",
          add_by: row?.add_by ?? user.username
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
          message(`您${title}了车牌号为${curData.car_no}的这条数据`, {
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

  async function handleSubmitData(data) {
    await submitVehicleFee(data);
  }

  function submitDialog(title = "提交", row?: FormItemProps) {
    let c = 0;
    let d = 0;
    let e = 0;
    const id = [];
    selectRows.value.forEach(v => {
      c += Number(v.amount);
      d += Number(v.actual_amount);
      e += Number(v.tax_amount);
      id.push(v.id);
    });
    addDialog({
      title: `${title}费用`,
      props: {
        formInline: {
          id: row?.id ?? id,
          amount: row?.amount ?? c,
          actual_amount: row?.actual_amount ?? d,
          tax_amount: row?.tax_amount ?? e,
          add_by: row?.add_by ?? user.username,
          fee_name: row?.fee_name ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(submitForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了车牌号为${curData.car_no}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "提交") {
              // 实际开发先调用新增接口，再进行下面操作
              handleSubmitData(curData);
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

  // 编辑按钮
  function handleEdit() {
    console.log("edit");
    // openDialog("编辑", currentRow.value);
  }

  async function asyncEdit(data) {
    await editVehicleFee(data);
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
    submitDialog,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleRowDblclick,
    handleEdit,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
