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
  editWhExport,
  oneStepRevoke,
  tempDropFinish,
  whDispatchList
} from "@/api/dispatch";
import { ElMessage, ElMessageBox } from "element-plus";

export function useRole() {
  const end = new Date();
  const start = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 5);
  const form = reactive({
    id: "",
    dispatch_id: "",
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
    car_no: "",
    transport_status: "",
    temp_port: "",
    temp_status: "",
    temp_time: "",
    export_seal_no: "",
    export_port: "",
    dispatch_car_no: "",
    trans_status: "",
    dispatch_remark: ""
  });
  const formRef = ref();
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
  const tableRowClassName = ({ row }) => {
    if (row.load_port === "武汉金口") {
      return "pure-warning-row";
    } else if (row.load_port === "武汉阳逻") {
      return "pure-success-row";
    }
    return "";
  };
  const columns: TableColumnList = [
    {
      label: "序号",
      type: "index"
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
      label: "送货地点",
      prop: "door"
    },
    {
      label: "做箱时间",
      prop: "make_time",
      formatter: ({ make_time }) => dayjs(make_time).format("YYYY-MM-DD HH:mm")
    },
    {
      label: "提箱点",
      prop: "load_port"
    },
    {
      label: "还箱点",
      prop: "unload_port"
    },
    {
      label: "装箱封号",
      prop: "export_seal_no"
    },
    {
      label: "装箱点",
      prop: "export_port"
    },
    {
      label: "车号",
      prop: "dispatch_car_no"
    },
    {
      label: "状态",
      prop: "trans_status"
    },
    {
      label: "备注",
      prop: "dispatch_remark"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await whDispatchList({
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
    writeFile(workBook, "武汉派车单.xlsx");
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
    const { data } = await whDispatchList({
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
          dispatch_id: row?.dispatch_id ?? "",
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
          transport_status: row?.transport_status ?? "",
          dispatch_remark: row?.dispatch_remark ?? "",
          export_port: row?.export_port ?? "",
          export_seal_no: row?.export_seal_no ?? ""
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
        const select_container_no = [];
        selectRows.value.forEach(v => {
          select_container_no.push(v.containner_no);
        });
        oneStepRevoke(select_container_no);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消修改提箱点"
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
        const select_container_no = [];
        selectRows.value.forEach(v => {
          select_container_no.push(v.containner_no);
        });
        tempDropFinish(select_container_no);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消修改提箱点"
        });
      });
  }

  // 双击行
  function handleRowDblclick(row) {
    console.log(row);
    openDialog("编辑", row);
  }

  async function asyncEdit(fee) {
    await editWhExport(fee);
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
    tableRowClassName,
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
    handleFinish
  };
}
