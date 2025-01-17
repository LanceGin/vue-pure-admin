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
  dispatchCar,
  dispatchRevoke,
  generateDispatchWithContainer,
  getUnpackingList,
  generateDispatch,
  importDispatch
} from "@/api/dispatch";
import { ElMessage, ElMessageBox } from "element-plus";
import { generateDispatchFee } from "@/api/finance";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
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
    city: user.city
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
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "箱号",
      prop: "containner_no"
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
      label: "提箱点",
      prop: "load_port"
    },
    {
      label: "做箱时间",
      prop: "make_time",
      formatter: ({ make_time }) =>
        dayjs(make_time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "暂落点",
      prop: "temp_port"
    },
    {
      label: "运单号",
      prop: "track_no"
    },
    {
      label: "船名航次",
      prop: "ship_name"
    },
    {
      label: "到港时间",
      prop: "arrive_time",
      formatter: ({ arrive_time }) => dayjs(arrive_time).format("YYYY-MM-DD")
    }
  ];

  const export_columns: TableColumnList = [
    {
      label: "做箱时间",
      prop: "make_time",
      formatter: ({ make_time }) =>
        dayjs(make_time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "箱号",
      prop: "containner_no"
    },
    {
      label: "车号",
      prop: "car_no"
    },
    {
      label: "门点",
      prop: "door"
    }
  ];

  // 导出一键派车表
  async function oneStepDispatch() {
    // const city = user.city;
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await generateDispatch({
      pagination: export_pagination,
      form
    });
    const res = data.list.map(item => {
      const arr = [];
      export_columns.forEach(column => {
        arr.push(item[column.prop as string]);
      });
      return arr;
    });
    const titleList = [];
    export_columns.forEach(column => {
      titleList.push(column.label);
    });
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "数据报表");
    writeFile(workBook, "一键派车表.xlsx");
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
    const { data } = await getUnpackingList({
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

  function handleDispatch() {
    ElMessageBox.prompt("请输入车牌号", "派车确认", {
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    })
      .then(car_no => {
        console.log(car_no);
        const data = {
          select_container_no: [],
          select_container: [],
          car_no: car_no
        };
        selectRows.value.forEach(v => {
          data.select_container_no.push(v.containner_no);
          data.select_container.push(v);
        });
        generateDispatchFee(data).then(() => {
          dispatchCar(data);
          onSearch();
        });
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消派车"
        });
      });
  }

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}`,
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
          car_no: row?.car_no ?? ""
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
          message(`您${title}了箱号为${curData.containner_no}的这条数据`, {
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
              const data = {
                select_container_id: [],
                select_dispatch_id: [],
                select_container: [],
                car_no: curData.car_no
              };
              selectRows.value.forEach(v => {
                data.select_container_id.push(v.id);
                data.select_dispatch_id.push(v.dispatch_id);
                data.select_container.push(v);
              });
              generateDispatchFee(data).then(() => {
                dispatchCar(data);
                onSearch();
              });
              // 实际开发先调用编辑接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  // 一键撤回
  async function handleRevoke() {
    ElMessageBox.confirm("撤回后箱子将撤回至挑箱阶段", "一键撤回", {
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    })
      .then(() => {
        const select_container_id = [];
        selectRows.value.forEach(v => {
          select_container_id.push(v.id);
        });
        dispatchRevoke(select_container_id);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消撤回"
        });
      });
  }

  // 上传文件批量导入
  async function uploadExcelDetail(item) {
    const form = new FormData();
    form.append("file", item.file);
    const { data } = await importDispatch(form);
    const select_container = {
      select_container: data.list
    };
    await generateDispatchFee(select_container).then(() => {
      generateDispatchWithContainer(select_container);
      onSearch();
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
    uploadExcelDetail,
    oneStepDispatch,
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange,
    handleDispatch,
    handleRevoke
  };
}
