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
  containerFeeList,
  dataCheckPay,
  setAmount,
  setInvoiceNo,
  setRemark,
  submitContainerFee
} from "@/api/statics";
import { ElMessage, ElMessageBox } from "element-plus";

export function useRole() {
  const form = reactive({
    id: "",
    status: "未提交",
    type: "应付",
    account_period: "",
    fee_name: "",
    amount: "",
    less_amount: "",
    more_amount: "",
    fee_type: "",
    remark: "",
    order_status: "",
    order_type: "",
    ship_company: "",
    customer: "",
    subproject: "",
    arrive_time: "",
    start_port: "",
    target_port: "",
    containner_no: "",
    seal_no: "",
    container_type: "",
    ship_name: "",
    track_no: "",
    unload_port: "",
    door: "",
    make_time: "",
    make_time_range: "",
    load_port: "",
    count: "",
    transfer_port: "",
    package_count: "",
    gross_weight: "",
    volume: "",
    container_weight: "",
    container_status: "",
    order_time: "",
    order_fee: "",
    car_no: "",
    add_by: "",
    add_time: "",
    project_name: "",
    custom_name: "",
    flow_direction: "",
    acc_company: "",
    content: "",
    invoice_no: ""
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
      label: "账期",
      prop: "account_period",
      formatter: ({ account_period }) => dayjs(account_period).format("YYYY-MM")
    },
    {
      label: "费用名称",
      prop: "fee_name"
    },
    {
      label: "金额",
      prop: "amount"
    },
    {
      label: "供应商",
      prop: "custom_name"
    },
    {
      label: "结算单位",
      prop: "acc_company"
    },
    {
      label: "服务内容",
      prop: "content"
    },
    {
      label: "做箱时间",
      prop: "make_time",
      formatter: ({ make_time }) => dayjs(make_time).format("YYYY-MM-DD")
    },
    {
      label: "单据类型",
      prop: "order_type"
    },
    {
      label: "客户简称",
      prop: "customer"
    },
    {
      label: "起始港",
      prop: "start_port"
    },
    {
      label: "目的港",
      prop: "target_port"
    },
    {
      label: "码头",
      prop: "load_port"
    },
    {
      label: "船公司",
      prop: "ship_company"
    },
    {
      label: "船名航次",
      prop: "ship_name"
    },
    {
      label: "箱封号",
      prop: "seal_no"
    },
    {
      label: "箱号",
      prop: "containner_no"
    },
    {
      label: "运单号",
      prop: "track_no"
    },
    {
      label: "箱型",
      prop: "container_type"
    },
    {
      label: "门点",
      prop: "door"
    },
    {
      label: "车辆",
      prop: "car_no"
    },
    {
      label: "备注",
      prop: "remark"
    },
    {
      label: "发票号",
      prop: "invoice_no"
    },
    {
      label: "录入人",
      prop: "add_by"
    },
    {
      label: "录入时间",
      prop: "add_time"
    },
    {
      label: "费用类型",
      prop: "fee_type"
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
    writeFile(workBook, "应付费用列表.xlsx");
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
    const { data } = await containerFeeList({
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

  function openDialog(title = "应付", row?: FormItemProps) {
    let c = 0;
    selectRows.value.forEach(v => {
      c += Number(v.amount);
    });
    addDialog({
      title: `${title}费用`,
      props: {
        formInline: {
          id: row?.id ?? "",
          status: row?.status ?? "",
          type: row?.type ?? "应付",
          account_period: row?.account_period ?? "",
          fee_name: row?.fee_name ?? "",
          amount: row?.amount ?? "",
          less_amount: row?.less_amount ?? 0,
          more_amount: row?.more_amount ?? 0,
          fee_type: row?.fee_type ?? "",
          remark: row?.remark ?? "",
          order_status: row?.order_status ?? "",
          order_type: row?.order_type ?? "",
          ship_company: row?.ship_company ?? "",
          customer: row?.customer ?? "",
          subproject: row?.subproject ?? "",
          arrive_time: row?.arrive_time ?? "",
          start_port: row?.start_port ?? "",
          target_port: row?.target_port ?? "",
          containner_no: row?.containner_no ?? "",
          seal_no: row?.seal_no ?? "",
          container_type: row?.container_type ?? "",
          container_fee: row?.container_fee ?? c,
          ship_name: row?.ship_name ?? "",
          track_no: row?.track_no ?? "",
          unload_port: row?.unload_port ?? "",
          door: row?.door ?? "",
          make_time: row?.make_time ?? "",
          load_port: row?.load_port ?? "",
          count: row?.count ?? "",
          transfer_port: row?.transfer_port ?? "",
          package_count: row?.package_count ?? "",
          gross_weight: row?.gross_weight ?? "",
          volume: row?.volume ?? "",
          container_weight: row?.container_weight ?? "",
          container_status: row?.container_status ?? "",
          order_time: row?.order_time ?? "",
          order_fee: row?.order_fee ?? "",
          car_no: row?.car_no ?? "",
          add_by: row?.add_by ?? "",
          add_time: row?.add_time ?? "",
          project_name: row?.project_name ?? "",
          custom_name: row?.custom_name ?? "",
          flow_direction: row?.flow_direction ?? "",
          acc_company: row?.acc_company ?? "",
          content: row?.content ?? ""
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
            if (title === "提交") {
              // 实际开发先调用新增接口，再进行下面操作
              handleSubmit(curData);
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

  // 上传文件批量导入
  async function uploadExcelDetail(item) {
    let flag = true;
    const form = new FormData();
    form.append("file", item.file);
    const { data } = await dataCheckPay(form);
    data.list.forEach((element, index) => {
      if (element.length === 0) {
        flag = false;
        ElMessage({
          type: "error",
          message: `第${index + 2}行数据有误`
        });
      }
    });
    if (flag) {
      ElMessage({
        type: "success",
        message: `比对通过`
      });
    }
  }

  // 提交统计费用
  async function handleSubmit(curData) {
    const data = {
      select_id: [],
      data: curData
    };
    selectRows.value.forEach(v => {
      data.select_id.push(v.fee_id);
    });
    submitContainerFee(data);
    onSearch();
  }

  // 批量设置发票号
  async function handleSetInvoiceNo() {
    ElMessageBox.prompt("请输入发票号", "批量设置发票号", {
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    })
      .then(invoice_no => {
        const data = {
          select_id: [],
          invoice_no: invoice_no
        };
        selectRows.value.forEach(v => {
          data.select_id.push(v.fee_id);
        });
        setInvoiceNo(data);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消设置发票号"
        });
      });
  }

  // 批量修改金额
  async function handleSetAmount() {
    ElMessageBox.prompt("请输入金额", "批量设置金额", {
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    })
      .then(amount => {
        const data = {
          select_id: [],
          amount: amount
        };
        selectRows.value.forEach(v => {
          data.select_id.push(v.fee_id);
        });
        setAmount(data);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消设置金额"
        });
      });
  }

  // 批量修改备注
  async function handleSetRemark() {
    ElMessageBox.prompt("请输入备注", "批量设置备注", {
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    })
      .then(remark => {
        const data = {
          select_id: [],
          remark: remark
        };
        selectRows.value.forEach(v => {
          data.select_id.push(v.fee_id);
        });
        setRemark(data);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消设置备注"
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
    handleDelete,
    uploadExcelDetail,
    // handleDatabase,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange,
    handleSetInvoiceNo,
    handleSetAmount,
    handleSetRemark
  };
}
