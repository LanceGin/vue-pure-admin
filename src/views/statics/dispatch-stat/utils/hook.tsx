// import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import submitForm from "../submit.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import {
  addVehicleFee,
  deleteVehicleFee,
  editVehicleFee,
  submitVehicleFee
} from "@/api/vehicle";
import { dispatchStatList } from "@/api/statics";

export function useRole() {
  const form = reactive({
    city: "",
    total: "",
    a: "",
    b: "",
    c: "",
    time_range: ""
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
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "地区",
      prop: "city"
    },
    {
      label: "拆箱",
      prop: "a"
    },
    {
      label: "装箱",
      prop: "b"
    },
    {
      label: "暂落",
      prop: "c"
    },
    {
      label: "汇总",
      prop: "total"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await dispatchStatList({
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
    writeFile(workBook, "业务量统计信息.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  async function handleDelete() {
    const data = {
      select_id: []
    };
    selectRows.value.forEach(v => {
      data.select_id.push(v.id);
    });
    message(`您删除了id为${data.select_id}的数据`, {
      type: "success"
    });
    console.log(11111, data);
    await deleteVehicleFee(data);
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
    const { data } = await dispatchStatList({
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
    await addVehicleFee(data);
  }

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}费用`,
      props: {
        formInline: {
          city: row?.city ?? ""
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
          message(`您${title}了车牌号为${curData.city}的这条数据`, {
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

  async function handleSubmitData(data) {
    await submitVehicleFee(data);
  }

  function submitDialog(title = "提交", row?: FormItemProps) {
    // let c = 0;
    // let d = 0;
    // let e = 0;
    // const id = [];
    // selectRows.value.forEach(v => {
    //   c += Number(v.amount);
    //   d += Number(v.actual_amount);
    //   e += Number(v.tax_amount);
    //   id.push(v.id);
    // });
    addDialog({
      title: `${title}费用`,
      props: {
        formInline: {
          city: row?.city ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(submitForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了车牌号为${curData.city}的这条数据`, {
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
              handleSubmitData(curData);
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
    console.log("edit");
    // openDialog("编辑", currentRow.value);
  }

  async function asyncEdit(data) {
    await editVehicleFee(data);
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
    submitDialog,
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
