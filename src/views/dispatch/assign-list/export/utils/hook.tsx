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
  generateExportDispatch,
  getExportDispatchList,
  importExportContainer
} from "@/api/dispatch";
import { useUserStore } from "@/store/modules/user";
import { generateDispatchFee, generateOrderFee } from "@/api/finance";
import { ElMessage, ElMessageBox } from "element-plus";
import { addExportContainer, deleteContainer } from "@/api/operation";

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
      label: "船公司",
      prop: "ship_company"
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
      label: "做箱时间",
      prop: "make_time",
      formatter: ({ make_time }) => dayjs(make_time).format("YYYY-MM-DD"),
      minWidth: 100
    },
    {
      label: "提箱点",
      prop: "load_port"
    },
    {
      label: "船名航次",
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
      label: "门点",
      prop: "door"
    },
    {
      label: "还箱点",
      prop: "unload_port"
    },
    {
      label: "车号",
      prop: "car_no"
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
      label: "中转港",
      prop: "transfer_port"
    },
    {
      label: "件数",
      prop: "package_count"
    },
    {
      label: "毛重",
      prop: "gross_weight"
    },
    {
      label: "体积",
      prop: "volume"
    },
    {
      label: "箱皮重",
      prop: "container_weight"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await getExportDispatchList({
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
    writeFile(workBook, "出口派车单.xlsx");
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

  async function handleAddContainer(container) {
    const { data } = await addExportContainer(container);
    const select_container = {
      select_container: data.list
    };
    generateExportDispatch(select_container);
    generateOrderFee(select_container.select_container);
    generateDispatchFee(select_container);
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getExportDispatchList({
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
      title: `${title}出口箱`,
      props: {
        formInline: {
          id: row?.id ?? "",
          order_status: row?.order_status ?? "已提交",
          order_type: row?.order_type ?? "出口",
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
          container_status: row?.container_status ?? "已完成",
          order_time: row?.order_time ?? "",
          order_fee: row?.order_fee ?? "",
          add_by: row?.add_by ?? user.username,
          city: row?.city ?? user.city
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
              handleAddContainer(curData);
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
    form.append("add_by", user.username);
    form.append("city", user.city);
    const { data } = await importExportContainer(form);
    const select_container = {
      select_container: data.list
    };
    generateExportDispatch(select_container);
    generateOrderFee(select_container.select_container);
    generateDispatchFee(select_container);
    ElMessage({
      type: "success",
      message: "导入成功"
    });
    onSearch();
  }

  // 删除
  async function handleDeleteContainer() {
    ElMessageBox.confirm("确认删除？箱子以及所包含费用都将删除", "删除数据", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        const data = {
          select_container_id: []
        };
        selectRows.value.forEach(v => {
          data.select_container_id.push(v.id);
          // 出口箱可删除任意状态的
          // if (v.container_status != "待挑箱") {
          //   throw new Error("非待挑箱状态无法删除");
          // }
        });
        deleteContainer(data);
        onSearch();
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
    uploadExcelDetail,
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleDelete,
    handleDeleteContainer,
    // handleDatabase,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
