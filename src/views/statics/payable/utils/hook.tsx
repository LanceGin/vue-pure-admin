import { utils, read, writeFile } from "xlsx";
import dayjs from "dayjs";
import editForm from "../form.vue";
import confirmForm from "../confirm-form.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import {
  confirmContainerFee,
  containerFeeList,
  dataCheckPay,
  revokeContainerFee,
  setAmount,
  setInvoiceNo,
  setRemark,
  submitContainerFee
} from "@/api/statics";
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
  const user = useUserStore();
  const form = reactive({
    id: "",
    status: "未提交",
    type: "应付",
    account_period: "",
    fee_name: "",
    amount: "",
    less_amount: "",
    more_amount: "",
    actual_amount: "",
    fee_type: "",
    remark: "",
    confirm_remark: "",
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
    apply_department: "",
    flow_direction: "",
    acc_company: "",
    content: "",
    invoice_no: "",
    car_owner: "",
    temp_port: "",
    city: user.city,
    city_type: ""
  });
  const formRef = ref();
  const selectRows = ref([]);
  const multipleSelection = ref([]);
  const total_amount = ref();
  const haveRow = ref(true);
  const dataList = ref([]);
  const loading = ref(true);
  // const switchLoadMap = ref({});
  // const { tagStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 200, 500, 1000],
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
      formatter: ({ account_period }) =>
        account_period === null
          ? ""
          : dayjs(account_period).format("YYYY-MM-DD"),
      minWidth: 100
    },
    {
      label: "费用名称",
      prop: "fee_name"
    },
    {
      label: "应付金额",
      prop: "amount"
    },
    {
      label: "实付金额",
      prop: "actual_amount",
      formatter: ({ actual_amount }) => actual_amount.toFixed(2)
    },
    {
      label: "做箱时间",
      prop: "make_time",
      cellRenderer: ({ row }) => {
        if (row.dispatch_type == "暂落") {
          return row.temp_time == null
            ? ""
            : dayjs(row.temp_time).format("YYYY-MM-DD");
        } else {
          return row.make_time == null
            ? ""
            : dayjs(row.make_time).format("YYYY-MM-DD");
        }
      },
      minWidth: 100
    },
    {
      label: "单据类型",
      prop: "order_type",
      cellRenderer: ({ row }) => {
        if (row.dispatch_type == "暂落") {
          return "暂落";
        } else if (row.dispatch_type == "放空") {
          return "放空";
        } else {
          return row.order_type;
        }
      }
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
      prop: "load_port",
      cellRenderer: ({ row }) => {
        if (row.order_type == "进口") {
          if (row.fee_name == "堆存费") {
            return row.temp_port;
          } else if (row.dispatch_type == "拆箱" && row.temp_port != null) {
            return row.temp_port;
          } else {
            return row.load_port;
          }
        } else if (row.transfer_port == "") {
          return row.unload_port;
        } else {
          return row.transfer_port;
        }
      }
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
      prop: "containner_no",
      minWidth: 120
    },
    {
      label: "运单号",
      prop: "track_no",
      minWidth: 120
    },
    {
      label: "箱型",
      prop: "container_type"
    },
    {
      label: "门点",
      prop: "door",
      cellRenderer: ({ row }) => {
        if (row.order_type == "进口") {
          if (row.dispatch_type == "拆箱" || row.fee_name == "堆存费") {
            return row.door;
          } else {
            return row.temp_port;
          }
        } else if (row.pay_door == "") {
          return row.door;
        } else {
          return row.pay_door;
        }
      }
    },
    {
      label: "暂落点",
      prop: "temp_port"
    },
    {
      label: "车辆",
      prop: "car_no",
      cellRenderer: ({ row }) => {
        if (row.order_type == "进口") {
          if (
            row.dispatch_type == "拆箱" ||
            row.fee_name == "堆存费" ||
            row.fee_name == "高速费"
          ) {
            return row.car_no;
          } else if (row.dispatch_type == "放空") {
            return row.empty_car_no;
          } else {
            return row.temp_car_no;
          }
        } else {
          return row.car_no;
        }
      }
    },
    {
      label: "费用备注",
      prop: "fee_remark"
    },
    {
      label: "确认备注",
      prop: "confirm_remark",
      hide: true
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
    },
    {
      label: "供应商",
      prop: "car_owner"
    },
    {
      label: "结算单位",
      prop: "acc_company"
    },
    {
      label: "服务内容",
      prop: "content"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await containerFeeList({
      pagination: export_pagination,
      form
    });
    const res = data.list.map(item => {
      const arr = [];
      columns.forEach(column => {
        if (column.prop == "account_period") {
          if (item["account_period"] == null) {
            arr.push("");
          } else {
            arr.push(dayjs(item["account_period"]).format("YYYY-MM-DD"));
          }
        } else if (column.prop == "make_time") {
          if (item["dispatch_type"] == "暂落") {
            if (item["temp_time"] == null) {
              arr.push("");
            } else {
              arr.push(dayjs(item["temp_time"]).format("YYYY-MM-DD"));
            }
          } else {
            if (item["make_time"] == null) {
              arr.push("");
            } else {
              arr.push(dayjs(item["make_time"]).format("YYYY-MM-DD"));
            }
          }
        } else if (column.prop == "amount") {
          arr.push(parseFloat(item["amount"]));
        } else if (column.prop == "order_type") {
          if (item["dispatch_type"] == "暂落") {
            arr.push("暂落");
          } else {
            arr.push(item["order_type"]);
          }
        } else if (column.prop == "load_port") {
          if (item["order_type"] == "进口") {
            if (
              item["dispatch_type"] == "暂落" ||
              item["fee_name"] == "堆存费"
            ) {
              arr.push(item["temp_port"]);
            } else {
              arr.push(item["load_port"]);
            }
          } else if (item["transfer_port"] == "") {
            arr.push(item["unload_port"]);
          } else {
            arr.push(item["transfer_port"]);
          }
        } else if (column.prop == "door") {
          if (item["order_type"] == "进口") {
            if (
              item["dispatch_type"] == "拆箱" ||
              item["fee_name"] == "堆存费"
            ) {
              arr.push(item["door"]);
            } else {
              arr.push(item["temp_port"]);
            }
          } else if (item["pay_door"] == "") {
            arr.push(item["door"]);
          } else {
            arr.push(item["pay_door"]);
          }
        } else if (column.prop == "car_no") {
          if (item["order_type"] == "进口") {
            if (
              item["dispatch_type"] == "拆箱" ||
              item["fee_name"] == "堆存费"
            ) {
              arr.push(item["car_no"]);
            } else {
              arr.push(item["temp_car_no"]);
            }
          } else {
            arr.push(item["car_no"]);
          }
        } else {
          arr.push(item[column.prop as string]);
        }
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
    total_amount.value = data.total_amount;
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
    let c_o = "";
    selectRows.value.forEach(v => {
      c += Number(v.amount);
      c_o = v.car_owner;
    });
    addDialog({
      title: `${title}费用`,
      props: {
        formInline: {
          id: row?.id ?? "",
          status: row?.status ?? "",
          type: row?.type ?? "应付",
          is_pay: row?.is_pay ?? "",
          account_period: row?.account_period ?? "",
          fee_name: row?.fee_name ?? "",
          amount: row?.amount ?? "",
          less_amount: row?.less_amount ?? 0,
          more_amount: row?.more_amount ?? 0,
          fee_type: row?.fee_type ?? "",
          remark: row?.remark ?? "",
          confirm_remark: row?.confirm_remark ?? "",
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
          container_fee: row?.container_fee ?? c.toFixed(2),
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
          custom_name: row?.car_owner ?? c_o,
          apply_department: row?.apply_department ?? "",
          flow_direction: row?.flow_direction ?? "",
          acc_company: row?.acc_company ?? "",
          content: row?.content ?? "",
          car_owner: row?.car_owner ?? c_o,
          submit_by: user.username
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

  function confirmDialog(title = "应付", row?: FormItemProps) {
    let c = 0;
    let c_o = "";
    selectRows.value.forEach(v => {
      c += Number(v.amount);
      c_o = v.car_owner;
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
          confirm_remark: row?.confirm_remark ?? "",
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
          container_fee: row?.container_fee ?? c.toFixed(2),
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
          custom_name: row?.car_owner ?? c_o,
          apply_department: row?.apply_department ?? "",
          flow_direction: row?.flow_direction ?? "",
          acc_company: row?.acc_company ?? "",
          content: row?.content ?? "",
          car_owner: row?.car_owner ?? c_o,
          submit_by: user.username
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(confirmForm, { ref: formRef }),
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
            if (title === "确认") {
              // 实际开发先调用新增接口，再进行下面操作
              handleConfirm(curData);
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
    const form_data = new FormData();
    form_data.append("file", item.file);
    const { data } = await dataCheckPay(form_data);
    const errorList = [];
    let tmpList = [];
    data.list.forEach((element, index) => {
      tmpList = tmpList.concat(element);
      if (element.length === 0) {
        flag = false;
        errorList.push(index + 2);
      }
    });

    const noList = [];
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target.result;
      const workbook = read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
      for (let index = 1; index < jsonData.length; index++) {
        noList.push(jsonData[index][0]);
      }
      form.containner_no = noList.join("\n");

      if (flag) {
        ElMessage({
          type: "success",
          message: `比对通过`
        });
      } else {
        const errorNo = [];
        errorList.forEach(index => {
          errorNo.push(jsonData[index - 1][0]);
        });
        ElMessage({
          type: "error",
          duration: 0,
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: `以下箱号数据有误:<br/> <br/> ${errorNo.join("<br/>")}`
        });
        onSearch();
      }
    };
    reader.readAsBinaryString(item.file);
  }

  // 确认统计费用
  async function handleConfirm(curData) {
    const data = {
      select_id: [],
      data: curData
    };
    selectRows.value.forEach(v => {
      data.select_id.push(v.fee_id);
    });
    confirmContainerFee(data).then(() => {
      onSearch();
    });
  }

  // 撤销确认统计费用
  async function handleRevoke() {
    ElMessageBox.confirm("仅允许撤回已确认费用", "撤回确认", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        const data = {
          select_id: []
        };
        selectRows.value.forEach(v => {
          data.select_id.push(v.fee_id);
          if (v.status !== "已确认") {
            throw new Error("仅能撤回已确认费用");
          }
        });
        revokeContainerFee(data).then(() => {
          onSearch();
        });
      })
      .catch(info => {
        if (info == "cancel") {
          info = "取消删除";
        }
        ElMessage({
          type: "info",
          message: info
        });
      });
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
    submitContainerFee(data).then(() => {
      onSearch();
    });
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
        setInvoiceNo(data).then(() => {
          onSearch();
        });
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
          if (v.status === "未审批" || v.status === "已审核") {
            throw new Error("已提交费用无法修改金额");
          }
        });
        setAmount(data).then(() => {
          onSearch();
        });
      })
      .catch(info => {
        if (info == "cancel") {
          info = "取消设置金额";
        }
        ElMessage({
          type: "info",
          message: info
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
        setRemark(data).then(() => {
          onSearch();
        });
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
    total_amount,
    // buttonClass,
    exportExcel,
    onSearch,
    resetForm,
    openDialog,
    confirmDialog,
    handleMenu,
    handleDelete,
    uploadExcelDetail,
    // handleDatabase,
    handleRevoke,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange,
    handleSetInvoiceNo,
    handleSetAmount,
    handleSetRemark
  };
}
