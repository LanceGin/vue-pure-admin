import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import {
  addBulkCargo,
  deleteBulkCargo,
  deleteShippingFee,
  editBulkCargo,
  generateShippingFee,
  getBulkCargoList,
  importShipping
} from "@/api/operation";
import { ElMessage } from "element-plus";
// import { func } from "vue-types";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
  const user = useUserStore();
  const form = reactive({
    id: "",
    type: "0",
    customer: "",
    ship_company: "",
    fleet: "",
    load_address: "",
    unload_address: "",
    bl_no: "",
    container_no: "",
    container_type: "",
    seal_no: "",
    flow_direction: "",
    voyage: "",
    address: "",
    car_type: "",
    car_no: "",
    driver_mobile: "",
    booking_fee: "",
    exchange_fee: "",
    freight: "",
    error_fee: "",
    remarks: "",
    add_time: "",
    add_by: user.username,
    city: user.city
  });
  const formRef = ref();
  const currentRow = ref();
  const haveRow = ref(true);
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 200, 500],
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "日期",
      prop: "add_time",
      formatter: ({ add_time }) => dayjs(add_time).format("YYYY-MM-DD")
    },
    {
      label: "客户",
      prop: "customer"
    },
    {
      label: "船公司",
      prop: "ship_company"
    },
    {
      label: "提单号",
      prop: "bl_no"
    },
    {
      label: "箱号",
      prop: "container_no"
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
      label: "流向",
      prop: "flow_direction"
    },
    {
      label: "船名航次",
      prop: "voyage"
    },
    {
      label: "地址",
      prop: "address"
    },
    {
      label: "车号",
      prop: "car_no"
    },
    {
      label: "备注",
      prop: "remarks"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await getBulkCargoList({
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
    writeFile(workBook, "海运列表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  async function handleDelete() {
    message(`您删除了客户名称为${currentRow.value.customer}的这条数据`, {
      type: "success"
    });
    deleteShippingFee(currentRow.value).then(() => {
      deleteBulkCargo(currentRow.value);
      onSearch();
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
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getBulkCargoList({
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

  async function handleAddBulkCargo(bulk) {
    const { data } = await addBulkCargo(bulk);
    const select_item = {
      select_item: data.list
    };
    generateShippingFee(select_item);
  }

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}船运记录`,
      props: {
        formInline: {
          id: row?.id ?? "",
          type: row?.type ?? "0",
          customer: row?.customer ?? "",
          ship_company: row?.ship_company ?? "",
          fleet: row?.fleet ?? "",
          load_address: row?.load_address ?? "",
          unload_address: row?.unload_address ?? "",
          bl_no: row?.bl_no ?? "",
          container_no: row?.container_no ?? "",
          container_type: row?.container_type ?? "",
          seal_no: row?.seal_no ?? "",
          flow_direction: row?.flow_direction ?? "",
          voyage: row?.voyage ?? "",
          address: row?.address ?? "",
          car_type: row?.car_type ?? "",
          car_no: row?.car_no ?? "",
          driver_mobile: row?.driver_mobile ?? "",
          booking_fee: row?.booking_fee ?? "",
          exchange_fee: row?.exchange_fee ?? "",
          freight: row?.freight ?? "",
          error_fee: row?.error_fee ?? "",
          remarks: row?.remarks ?? "",
          add_time: row?.add_time ?? "",
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
          message(`您${title}了客户名称为${curData.customer}的这条数据`, {
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
              handleAddBulkCargo(curData);
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

  // 上传文件批量导入
  async function uploadExcelDetail(item) {
    const form = new FormData();
    form.append("file", item.file);
    const { data } = await importShipping(form);
    const select_item = {
      select_item: data.list
    };
    generateShippingFee(select_item);
    ElMessage({
      type: "success",
      message: "导入成功"
    });
    onSearch();
  }

  // 编辑按钮
  function handleEdit() {
    openDialog("编辑", currentRow.value);
  }

  async function asyncEdit(yard) {
    await editBulkCargo(yard);
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
    console.log(haveRow.value);
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
    handleEdit,
    handleRowDblclick,
    // handleDatabase,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
