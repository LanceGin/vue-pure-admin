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
import {
  editContainerInfo,
  oneStepRevoke,
  tempDropDispatchList,
  tempDropFinish
} from "@/api/dispatch";
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import { submitEir, syncEir, transferEir } from "@/api/third";

export function useRole() {
  // const end = new Date();
  // const start = new Date();
  // start.setTime(start.getTime() - 3600 * 1000 * 24 * 5);
  const user = useUserStore();
  const form = reactive({
    id: "",
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
    dispatch_car_no: "",
    transport_status: "",
    trans_status: "",
    temp_port: "",
    temp_status: "",
    temp_time: "",
    city: user.city,
    type: "",
    receipt_no: ""
  });
  const formRef = ref();
  const selectRows = ref([]);
  const haveRow = ref(true);
  const dataList = ref([]);
  const eirSuccessList = ref([]);
  const eirErrorList = ref([]);
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
      type: "expand",
      slot: "expand"
    },
    {
      label: "暂落时间",
      prop: "temp_time",
      formatter: ({ temp_time }) => dayjs(temp_time).format("YYYY-MM-DD"),
      minWidth: 100
    },
    {
      label: "客户/项目",
      prop: "customer"
    },
    {
      label: "提箱点",
      prop: "load_port"
    },
    {
      label: "运单号",
      prop: "track_no",
      minWidth: 120
    },
    {
      label: "船名航次",
      prop: "ship_name"
    },
    {
      label: "箱号",
      prop: "containner_no",
      minWidth: 120
    },
    {
      label: "箱型",
      prop: "container_type"
    },
    {
      label: "封号",
      prop: "seal_no"
    },
    {
      label: "暂落点",
      prop: "temp_port"
    },
    {
      label: "车号",
      prop: "dispatch_car_no"
    },
    {
      label: "运输状态",
      prop: "trans_status"
    },
    {
      label: "设备交接号",
      prop: "receipt_no"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await tempDropDispatchList({
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
    writeFile(workBook, "暂落派车单.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  function handleDelete(row) {
    message(`您删除了运单号为${row.yundanhao}的这条数据`, { type: "success" });
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
    const { data } = await tempDropDispatchList({
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
      title: `${title}箱信息`,
      props: {
        formInline: {
          id: row?.id ?? "",
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
          ship_name: row?.ship_name ?? "",
          track_no: row?.track_no ?? "",
          unload_port: row?.unload_port ?? "",
          door: row?.door ?? "",
          make_time: dayjs(row?.make_time).format("YYYY-MM-DD") ?? "",
          temp_time: dayjs(row?.temp_time).format("YYYY-MM-DD") ?? "",
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
          type: row?.type ?? "",
          transport_status: row?.transport_status ?? "",
          temp_port: row?.temp_port ?? ""
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
          message(`您${title}了运单号为${curData.track_no}的这条数据`, {
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
              asyncEdit(curData);
              chores();
            }
          }
        });
      }
    });
  }

  // 一键撤回
  async function handleRevoke() {
    ElMessageBox.confirm("撤回后箱子将撤回至派车阶段", "一键撤回", {
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    })
      .then(() => {
        const data = {
          type: "暂落",
          select_container_id: []
        };
        selectRows.value.forEach(v => {
          data.select_container_id.push(v.id);
        });
        oneStepRevoke(data);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消一键撤回"
        });
      });
  }

  // 一键完成
  async function handleFinish() {
    ElMessageBox.confirm("完成后箱子将完成所有点灯流程", "一键完成", {
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    })
      .then(() => {
        const select_container_id = [];
        selectRows.value.forEach(v => {
          select_container_id.push(v.id);
        });
        tempDropFinish(select_container_id);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消一键完成"
        });
      });
  }

  // 同步eir
  async function handleSyncEir() {
    ElMessageBox.confirm(
      "设备交接号同步后可进行Eir派单或转单",
      "同步Eir设备交接号",
      {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }
    )
      .then(() => {
        let i = 0;
        for (const v of selectRows.value) {
          syncEir(v).then(res => {
            i += 1;
            if (res.success) {
              eirSuccessList.value.push(v.containner_no);
            } else {
              eirErrorList.value.push(v.containner_no);
            }
            if (i == selectRows.value.length) {
              if (eirSuccessList.value.length > 0) {
                ElMessage({
                  type: "success",
                  showClose: true,
                  message: `箱号${eirSuccessList.value.toString()}同步成功`
                });
              }
              if (eirErrorList.value.length > 0) {
                ElMessage({
                  type: "error",
                  showClose: true,
                  message: `箱号${eirErrorList.value.toString()}同步失败`
                });
              }
            }
          });
        }
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消推送"
        });
      });
  }

  // 推送eir
  async function handleEir() {
    ElMessageBox.confirm("确认后将推送至Eir平台", "推送Eir", {
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    })
      .then(() => {
        let i = 0;
        for (const v of selectRows.value) {
          submitEir(v).then(res => {
            i += 1;
            if (res.success) {
              eirSuccessList.value.push(v.containner_no);
            } else {
              eirErrorList.value.push(v.containner_no);
            }
            if (i == selectRows.value.length) {
              if (eirSuccessList.value.length > 0) {
                ElMessage({
                  type: "success",
                  duration: 0,
                  showClose: true,
                  message: `箱号${eirSuccessList.value.toString()}推送成功`
                });
              }
              if (eirErrorList.value.length > 0) {
                ElMessage({
                  type: "error",
                  duration: 0,
                  showClose: true,
                  message: `箱号${eirErrorList.value.toString()}推送失败`
                });
              }
            }
          });
        }
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消推送"
        });
      });
  }

  // eir转单
  async function handleTransferEir() {
    ElMessageBox.confirm("确认后将推送至Eir平台进行转单", "推送Eir", {
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    })
      .then(() => {
        let i = 0;
        for (const v of selectRows.value) {
          transferEir(v).then(res => {
            i += 1;
            if (res.success) {
              eirSuccessList.value.push(v.containner_no);
            } else {
              eirErrorList.value.push(v.containner_no);
            }
            if (i == selectRows.value.length) {
              if (eirSuccessList.value.length > 0) {
                ElMessage({
                  type: "success",
                  duration: 0,
                  showClose: true,
                  message: `箱号${eirSuccessList.value.toString()}推送成功`
                });
              }
              if (eirErrorList.value.length > 0) {
                ElMessage({
                  type: "error",
                  duration: 0,
                  showClose: true,
                  message: `箱号${eirErrorList.value.toString()}推送失败`
                });
              }
            }
          });
        }
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消推送"
        });
      });
  }

  // 双击行
  function handleRowDblclick(row) {
    console.log(row);
    openDialog("编辑", row);
  }

  async function asyncEdit(fee) {
    await editContainerInfo(fee);
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
    haveRow,
    loading,
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
    handleRowDblclick,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange,
    handleRevoke,
    handleFinish,
    handleSyncEir,
    handleEir,
    handleTransferEir
  };
}
