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
  addOilConsumption,
  deleteOilConsumption,
  editOilConsumption,
  oilConsumptionList
} from "@/api/vehicle";

export function useRole() {
  const form = reactive({
    id: "",
    car_no: "",
    month: "",
    mileage: "",
    oil_standard: "",
    mileage_fix: "",
    volume: "",
    actual_volume: "",
    total_amount: "",
    delta_volume: "",
    reward_amount: "",
    remark: ""
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
      label: "序号",
      type: "index"
    },
    {
      label: "车号",
      prop: "car_no"
    },
    {
      label: "月份",
      prop: "month"
    },
    {
      label: "实际里程",
      children: [
        {
          label: "月里程数（KM）",
          prop: "mileage"
        },
        {
          label: "油耗标准（L/100KM）",
          prop: "oil_standard"
        },
        {
          label: "里程修正系统",
          prop: "mileage_fix"
        }
      ]
    },
    {
      label: "核定油耗",
      children: [
        {
          label: "升数（L）",
          prop: "volume"
        }
      ]
    },
    {
      label: "实际消费",
      children: [
        {
          label: "升数（L）",
          prop: "actual_volume"
        },
        {
          label: "总金额",
          prop: "total_amount"
        }
      ]
    },
    {
      label: "（正数为超油）",
      children: [
        {
          label: "升数（L）",
          prop: "delta_volume"
        }
      ]
    },
    {
      label: "每月油耗奖励",
      children: [
        {
          label: "元",
          prop: "reward_amount"
        }
      ]
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
    const { data } = await oilConsumptionList({
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
    writeFile(workBook, "油耗核算信息.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  async function handleDelete() {
    message(`您删除了车号为${currentRow.value.car_no}的这条数据`, {
      type: "success"
    });
    await deleteOilConsumption(currentRow.value);
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
    const { data } = await oilConsumptionList({
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
    await addOilConsumption(data);
  }

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}核算记录`,
      props: {
        formInline: {
          id: row?.id ?? "",
          car_no: row?.car_no ?? "",
          month: row?.month ?? "",
          mileage: row?.mileage ?? "",
          oil_standard: row?.oil_standard ?? "",
          mileage_fix: row?.mileage_fix ?? "",
          volume: row?.volume ?? "",
          actual_volume: row?.actual_volume ?? "",
          total_amount: row?.total_amount ?? "",
          delta_volume: row?.delta_volume ?? "",
          reward_amount: row?.reward_amount ?? "",
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

  // 编辑按钮
  function handleEdit() {
    openDialog("编辑", currentRow.value);
  }

  async function asyncEdit(data) {
    await editOilConsumption(data);
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
    // handleDatabase,
    handleRowDblclick,
    handleEdit,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
