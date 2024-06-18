// import dayjs from "dayjs";
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
  addVehicleInfo,
  deleteVehicleInfo,
  editVehicleInfo,
  importVehicleInfo,
  vehicleInfoList
} from "@/api/vehicle";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
  const user = useUserStore();
  const form = reactive({
    id: "",
    territory: "",
    brand: "",
    car_no: "",
    emission: "",
    life: "",
    axles: "",
    owner: "",
    attachment: "",
    oil_card_owner: "",
    hang_board_no: "",
    driver: "",
    mobile: "",
    attribute: "",
    remark: "",
    add_by: user.username
  });
  const formRef = ref();
  const currentRow = ref();
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
      label: "车辆属地",
      prop: "territory"
    },
    {
      label: "品牌",
      prop: "brand"
    },
    {
      label: "车牌号",
      prop: "car_no"
    },
    {
      label: "排放",
      prop: "emission"
    },
    {
      label: "车辆购买年限",
      prop: "life"
    },
    {
      label: "轴数",
      prop: "axles"
    },
    {
      label: "车辆所属",
      prop: "owner"
    },
    {
      label: "车辆挂靠",
      prop: "attachment"
    },
    {
      label: "油卡归属",
      prop: "oil_card_owner"
    },
    {
      label: "挂板号",
      prop: "hang_board_no"
    },
    {
      label: "驾驶员",
      prop: "driver"
    },
    {
      label: "手机号",
      prop: "mobile"
    },
    {
      label: "属性",
      prop: "attribute"
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
    const { data } = await vehicleInfoList({
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
    writeFile(workBook, "车辆信息.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  async function handleDelete() {
    message(`您删除了司机名称为${currentRow.value.driver}的这条数据`, {
      type: "success"
    });
    await deleteVehicleInfo(currentRow.value);
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

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await vehicleInfoList({
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

  async function handleAddMotorcade(vehicle) {
    await addVehicleInfo(vehicle);
  }

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}车辆`,
      props: {
        formInline: {
          id: row?.id ?? "",
          territory: row?.territory ?? "",
          brand: row?.brand ?? "",
          car_no: row?.car_no ?? "",
          emission: row?.emission ?? "",
          life: row?.life ?? "",
          axles: row?.axles ?? "",
          owner: row?.owner ?? "",
          attachment: row?.attachment ?? "",
          oil_card_owner: row?.oil_card_owner ?? "",
          hang_board_no: row?.hang_board_no ?? "",
          driver: row?.driver ?? "",
          mobile: row?.mobile ?? "",
          attribute: row?.attribute ?? "",
          remark: row?.remark ?? ""
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
              handleAddMotorcade(curData);
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
    form.append("is_pay", "1");
    await importVehicleInfo(form);
  }

  // 编辑按钮
  function handleEdit() {
    openDialog("编辑", currentRow.value);
  }

  async function asyncEdit(vehicle) {
    await editVehicleInfo(vehicle);
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
    handleMenu,
    handleDelete,
    handleEdit,
    handleRowDblclick,
    uploadExcelDetail,
    // handleDatabase,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
