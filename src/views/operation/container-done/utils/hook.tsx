import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import fixForm from "../fix-form.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import {
  containerWithFeeList,
  importDocumentCheck,
  submitDocumentCheck,
  addContainerFee,
  getDispatchFeeList,
  fixContainerInfo
} from "@/api/operation";
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
  const user = useUserStore();
  const end = new Date();
  const start = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
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
    make_time_range: ref<[Date, Date]>([start, end]),
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
    temp_status: "",
    temp_port: "",
    trans_status: "",
    abnormal_fee: "",
    dispatch_remark: "",
    dispatch_car_no: "",
    amount: "",
    remark: "",
    op_time: "",
    city: user.city
  });
  const formRef = ref();
  const currentRow = ref();
  const selectRows = ref([]);
  const haveRow = ref(true);
  const dataList = ref([]);
  const containerFeeList = ref([]);
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
      label: "状态",
      prop: "trans_status"
    },
    {
      label: "拆箱/暂落时间",
      prop: "op_time",
      formatter: ({ op_time }) => dayjs(op_time).format("YYYY-MM-DD"),
      minWidth: 120
    },
    {
      label: "类型",
      prop: "type"
    },
    {
      label: "客户",
      prop: "customer"
    },
    {
      label: "子项目",
      prop: "subproject"
    },
    {
      label: "门点",
      prop: "door"
    },
    {
      label: "船名",
      prop: "ship_name"
    },
    {
      label: "运单号",
      prop: "track_no",
      minWidth: 120
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
      label: "车号",
      prop: "dispatch_car_no"
    },
    {
      label: "拖车费",
      prop: "amount"
    },
    {
      label: "提箱点",
      prop: "load_port",
      cellRenderer: ({ row }) => {
        if (row.temp_port != null && row.type == "拆箱") {
          return row.temp_port;
        } else {
          return row.load_port;
        }
      }
    },
    {
      label: "还箱点",
      prop: "unload_port"
    },
    {
      label: "暂落点",
      prop: "temp_port",
      cellRenderer: ({ row }) => {
        if (row.type == "暂落") {
          return row.temp_port;
        } else {
          return "";
        }
      }
    },
    {
      label: "中转港",
      prop: "transfer_port"
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
      label: "箱子备注",
      prop: "remark"
    }
  ];

  const containerFeeColumns: TableColumnList = [
    {
      label: "费用名",
      prop: "fee_name"
    },
    {
      label: "金额",
      prop: "fee"
    },
    {
      label: "备注",
      prop: "remark"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await containerWithFeeList({
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
    for (let i = 1; i < res.length; i++) {
      const element = res[i];
      element[1] = dayjs(element[1]).format("YYYY-MM-DD");
    }
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "数据报表");
    writeFile(workBook, "已完成列表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  function handleDelete() {
    message(`您删除了订单号为${currentRow.value.track_no}的这条数据`, {
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

  async function onSearch() {
    loading.value = true;
    const { data } = await containerWithFeeList({
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

  async function handleAddContainerFee(container) {
    await addContainerFee(container);
  }

  async function handleEditContainer(container) {
    await fixContainerInfo(container);
  }

  function openDialog(title = "添加") {
    addDialog({
      title: `${title}费用`,
      props: {
        formInline: {
          dispatch_id: currentRow.value.dispatch_id,
          id: currentRow.value.id,
          track_no: currentRow.value.track_no,
          containner_no: currentRow.value.containner_no,
          type: "",
          status: "",
          fee_name: "",
          amount: "",
          abnormal_fee: currentRow.value.abnormal_fee,
          dispatch_remark: currentRow.value.dispatch_remark,
          add_by: user.username
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
          message(
            `您为订单号为${curData.track_no}的这条数据${title}了异常费用`,
            {
              type: "success"
            }
          );
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "添加") {
              // 实际开发先调用新增接口，再进行下面操作
              handleAddContainerFee(curData);
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

  function fixDialog(title = "修正") {
    addDialog({
      title: `${title}箱信息`,
      props: {
        formInline: {
          dispatch_id: currentRow.value.dispatch_id,
          id: currentRow.value.id,
          ship_name: currentRow.value.ship_name,
          track_no: currentRow.value.track_no,
          containner_no: currentRow.value.containner_no,
          seal_no: currentRow.value.seal_no,
          container_type: currentRow.value.container_type,
          door: currentRow.value.door,
          load_port: currentRow.value.load_port,
          unload_port: currentRow.value.unload_port,
          car_no: currentRow.value.car_no,
          make_time: dayjs(currentRow.value.make_time).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          add_by: user.username
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(fixForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(
            `您为订单号为${curData.track_no}的这条数据${title}了异常费用`,
            {
              type: "success"
            }
          );
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "修正") {
              // 实际开发先调用新增接口，再进行下面操作
              handleEditContainer(curData);
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
    const form = new FormData();
    form.append("file", item.file);
    await importDocumentCheck(form);
  }

  // 提交单据
  async function handleSubmit() {
    ElMessageBox.confirm("确认提交后箱子将进入挑箱流程？", "提交确认", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        console.log("submit", selectRows.value);
        const select_track_no = [];
        selectRows.value.forEach(v => {
          select_track_no.push(v.track_no);
        });
        submitDocumentCheck(select_track_no);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消提交"
        });
      });
  }

  // 编辑按钮
  function handleEdit() {
    openDialog("编辑");
  }

  // 双击行
  async function handleRowDblclick(form) {
    getDispatchFeeList({
      form
    }).then(data => {
      containerFeeList.value = data.data.list;
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
    haveRow,
    containerVisible,
    columns,
    containerFeeColumns,
    dataList,
    containerFeeList,
    pagination,
    // buttonClass,
    exportExcel,
    onSearch,
    resetForm,
    openDialog,
    fixDialog,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleRowDblclick,
    uploadExcelDetail,
    handleSubmit,
    handleEdit,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange
    // handleSelectionChange
  };
}
